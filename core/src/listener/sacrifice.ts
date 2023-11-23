import { ethers } from 'ethers'
import { Logger } from 'pino'
import type { RedisClientType } from 'redis'
import { listenerService } from './listener'
import { ISacrifice, ProcessEventOutputType } from './types'
import { ISacrificeListenerWorker } from '../types'
import {
  LISTENER_SACRIFICE_LATEST_QUEUE_NAME,
  LISTENER_SACRIFICE_PROCESS_EVENT_QUEUE_NAME,
  WORKER_SACRIFICE_QUEUE_NAME,
  SACRIFICE_ADDRESS
} from '../settings'
import { SacrificeAbis } from '../contracts/sacrifice'
const FILE_NAME = import.meta.url

export async function buildSacrificeListener(redisClient: RedisClientType, logger: Logger) {
  const eventName = 'TornSacrificed'
  const latestQueueName = LISTENER_SACRIFICE_LATEST_QUEUE_NAME
  const processEventQueueName = LISTENER_SACRIFICE_PROCESS_EVENT_QUEUE_NAME
  const workerQueueName = WORKER_SACRIFICE_QUEUE_NAME
  const iface = new ethers.Interface(SacrificeAbis)
  listenerService({
    contractAddress: SACRIFICE_ADDRESS,
    abi: SacrificeAbis,
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
  const _logger = logger.child({ name: 'processEvent', file: FILE_NAME })
  async function wrapper(log): Promise<ProcessEventOutputType | undefined> {
    const eventData = iface.parseLog(log)?.args as unknown as ISacrifice
    _logger.debug(eventData, 'eventData')
    const jobName = 'spoilClaimer'
    const txHash = log.transactionHash
    const jobData: ISacrificeListenerWorker = {
      txHash,
      account: eventData.account,
      owner: eventData.owner,
      tokenId: Number(eventData.tokenId),
      sacrificeType: Number(eventData.sacrificeType),
      requireRitualStone: eventData.requireRitualStone
    }
    _logger.debug(jobData, 'jobData')

    return { jobName, jobId: txHash, jobData }
  }

  return wrapper
}
