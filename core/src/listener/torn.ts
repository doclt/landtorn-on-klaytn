import { ethers } from 'ethers'
import { Logger } from 'pino'
import type { RedisClientType } from 'redis'
import { listenerService } from './listener'
import { ITornMinted, ProcessEventOutputType } from './types'
import { ITornListenerWorker } from '../types'
import {
  LISTENER_TORN_LATEST_QUEUE_NAME,
  LISTENER_TORN_PROCESS_EVENT_QUEUE_NAME,
  TORN_ADDRESS,
  WORKER_TORN_QUEUE_NAME
} from '../settings'
import { abis } from '../utils'
const FILE_NAME = import.meta.url

export async function buildListener(redisClient: RedisClientType, logger: Logger) {
  const eventName = 'TokenMinted'
  const latestQueueName = LISTENER_TORN_LATEST_QUEUE_NAME
  const processEventQueueName = LISTENER_TORN_PROCESS_EVENT_QUEUE_NAME
  const workerQueueName = WORKER_TORN_QUEUE_NAME
  const abi = await abis('torn')
  const iface = new ethers.Interface(abi)
  listenerService({
    contractAddress: TORN_ADDRESS,
    abi,
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
    const eventData = iface.parseLog(log)?.args as unknown as ITornMinted
    _logger.debug(eventData, 'eventData')

    const jobName = 'torn'
    const txHash = log.transactionHash
    const jobData: ITornListenerWorker = {
      txHash,
      tokenId: Number(eventData.tokenId),
      tokenType: Number(eventData.tokenType),
      owner: eventData.owner,
      tokenContract: log.address
    }
    _logger.debug(jobData, 'jobData')

    return { jobName, jobId: txHash, jobData }
  }

  return wrapper
}
