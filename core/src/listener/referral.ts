import { ethers } from 'ethers'
import { Logger } from 'pino'
import type { RedisClientType } from 'redis'
import { listenerService } from './listener'
import { IReferralClaim, ProcessEventOutputType } from './types'
import { IReferralListenerWorker } from '../types'
import {
  LISTENER_REFERAL_LATEST_QUEUE_NAME,
  LISTENER_REFERAL_PROCESS_EVENT_QUEUE_NAME,
  REFERRAL_ADDRESS,
  WORKER_REFERAL_QUEUE_NAME
} from '../settings'
import { referralAbis } from '../contracts/referral'
const FILE_NAME = import.meta.url

export async function buildReferralListener(redisClient: RedisClientType, logger: Logger) {
  const eventName = 'Claimed'
  const latestQueueName = LISTENER_REFERAL_LATEST_QUEUE_NAME
  const processEventQueueName = LISTENER_REFERAL_PROCESS_EVENT_QUEUE_NAME
  const workerQueueName = WORKER_REFERAL_QUEUE_NAME
  const iface = new ethers.Interface(referralAbis)
  listenerService({
    contractAddress: REFERRAL_ADDRESS,
    abi: referralAbis,
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
  const _logger = logger.child({ name: 'processReferralClaim', file: FILE_NAME })
  async function wrapper(log): Promise<ProcessEventOutputType | undefined> {
    const eventData = iface.parseLog(log)?.args as unknown as IReferralClaim
    _logger.debug(eventData, 'eventData')
    const jobName = 'referralClaim'
    const txHash = log.transactionHash
    const jobData: IReferralListenerWorker = {
      txHash,
      account: eventData.account,
      owner: eventData.owner,
      tokenId: Number(eventData.tokenId),
      rewardType: Number(eventData.rewardType)
    }
    _logger.debug(jobData, 'jobData')

    return { jobName, jobId: txHash, jobData }
  }

  return wrapper
}
