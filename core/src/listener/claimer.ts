import { ethers } from 'ethers'
import { Logger } from 'pino'
import type { RedisClientType } from 'redis'
import { listenerService } from './listener'
import { IPaticipated, ProcessEventOutputType } from './types'
import { ISpoilClaimerListenerWorker } from '../types'
import {
  LISTENER_SPOIL_CLAIMER_LATEST_QUEUE_NAME,
  LISTENER_SPOIL_CLAIMER_PROCESS_EVENT_QUEUE_NAME,
  SPOIL_CLAIMER_ADDRESS,
  WORKER_SPOIL_CLAIMER_QUEUE_NAME
} from '../settings'
import { SpoilClaimerAbis } from '../contracts/spoilClaimer'
const FILE_NAME = import.meta.url

export async function buildClaimerListener(redisClient: RedisClientType, logger: Logger) {
  const eventName = 'Participated'
  const latestQueueName = LISTENER_SPOIL_CLAIMER_LATEST_QUEUE_NAME
  const processEventQueueName = LISTENER_SPOIL_CLAIMER_PROCESS_EVENT_QUEUE_NAME
  const workerQueueName = WORKER_SPOIL_CLAIMER_QUEUE_NAME
  const iface = new ethers.Interface(SpoilClaimerAbis)
  listenerService({
    contractAddress: SPOIL_CLAIMER_ADDRESS,
    abi: SpoilClaimerAbis,
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
    const eventData = iface.parseLog(log)?.args as unknown as IPaticipated
    _logger.debug(eventData, 'eventData')
    const jobName = 'spoilClaimer'
    const txHash = log.transactionHash
    const jobData: ISpoilClaimerListenerWorker = {
      txHash,
      account: eventData.account,
      owner: eventData.owner,
      gameType: Number(eventData.gameType),
      gameId: Number(eventData.gameId),
      energy: Number(eventData.energy),
      tokenId: Number(eventData.tokenId)
    }
    _logger.debug(jobData, 'jobData')

    return { jobName, jobId: txHash, jobData }
  }

  return wrapper
}
