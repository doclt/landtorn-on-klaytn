import { ethers } from 'ethers'
import { Logger } from 'pino'
import type { RedisClientType } from 'redis'
import { listenerService } from './listener'
import { IItemBought, ProcessEventOutputType } from './types'
import { IMarketplaceListenerWorker } from '../types'
import {
  LISTENER_MARKETPLACE_LATEST_QUEUE_NAME,
  LISTENER_MARKETPLACE_PROCESS_EVENT_QUEUE_NAME,
  MARKETPLACE_ADDRESS,
  WORKER_MARKETPLACE_QUEUE_NAME
} from '../settings'
import { marketplaceAbis } from '../contracts/marketplace'
const FILE_NAME = import.meta.url

export async function buildListener(redisClient: RedisClientType, logger: Logger) {
  const eventName = 'ItemBought'
  const latestQueueName = LISTENER_MARKETPLACE_LATEST_QUEUE_NAME
  const processEventQueueName = LISTENER_MARKETPLACE_PROCESS_EVENT_QUEUE_NAME
  const workerQueueName = WORKER_MARKETPLACE_QUEUE_NAME
  const iface = new ethers.Interface(marketplaceAbis)
  listenerService({
    contractAddress: MARKETPLACE_ADDRESS,
    abi: marketplaceAbis,
    eventName,
    latestQueueName,
    processEventQueueName,
    workerQueueName,
    processFn: await processEvent({ iface, logger }),
    redisClient,
    logger
  })
}

async function processEvent({ iface, logger }: { iface: ethers.Interface; logger: Logger }) {
  const _logger = logger.child({ name: 'processMarketplaceClaim', file: FILE_NAME })
  async function wrapper(log): Promise<ProcessEventOutputType | undefined> {
    const eventData = iface.parseLog(log)?.args as unknown as IItemBought
    _logger.debug(eventData, 'eventData')
    const jobName = 'marketplaceBuyItem'
    const txHash = log.transactionHash
    const jobData: IMarketplaceListenerWorker = {
      txHash,
      account: eventData.recipient,
      owner: eventData.sender,
      itemType: Number(eventData.itemType),
      id: Number(eventData.id),
      itemId: Number(eventData.itemId),
      amount: Number(eventData.amount)
    }
    _logger.debug(jobData, 'jobData')
    return { jobName, jobId: txHash, jobData }
  }

  return wrapper
}
