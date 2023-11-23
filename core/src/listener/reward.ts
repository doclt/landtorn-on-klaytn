import { ethers } from 'ethers'
import { Logger } from 'pino'
import type { RedisClientType } from 'redis'
import { listenerService } from './listener'
import { IReward, ProcessEventOutputType } from './types'
import { IRewardListenerWorker } from '../types'
import {
  LISTENER_REWARD_LATEST_QUEUE_NAME,
  WORKER_REWARD_QUEUE_NAME,
  LISTENER_REWARD_PROCESS_EVENT_QUEUE_NAME,
  REWARD_ADDRESS
} from '../settings'
import { RewardAbis } from '../contracts/reward'
const FILE_NAME = import.meta.url

export async function buildRewardListener(redisClient: RedisClientType, logger: Logger) {
  const eventName = 'RewardClaimed'
  const latestQueueName = LISTENER_REWARD_LATEST_QUEUE_NAME
  const processEventQueueName = LISTENER_REWARD_PROCESS_EVENT_QUEUE_NAME
  const workerQueueName = WORKER_REWARD_QUEUE_NAME
  const iface = new ethers.Interface(RewardAbis)
  listenerService({
    contractAddress: REWARD_ADDRESS,
    abi: RewardAbis,
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
  const _logger = logger.child({ name: 'processClaimRewardEvent', file: FILE_NAME })
  async function wrapper(log): Promise<ProcessEventOutputType | undefined> {
    const eventData = iface.parseLog(log)?.args as unknown as IReward
    _logger.debug(eventData, 'eventData')
    const jobName = 'reward'
    const txHash = log.transactionHash
    const jobData: IRewardListenerWorker = {
      txHash,
      account: eventData.account,
      owner: eventData.owner,
      tokenId: Number(eventData.tokenId),
      spoilId: Number(eventData.spoilId)
    }
    _logger.debug(jobData, 'jobData')

    return { jobName, jobId: txHash, jobData }
  }

  return wrapper
}
