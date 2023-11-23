import { ethers } from 'ethers'
import {
  IMarketplaceListenerWorker,
  IReferralListenerWorker,
  IRewardListenerWorker,
  ISacrificeListenerWorker,
  IShardTransferListenerWorker,
  ISpoilClaimerListenerWorker,
  ITornListenerWorker
} from '../types'
import { RedisClientType } from 'redis'
import { Logger } from 'pino'

interface IJobQueueSettings {
  removeOnComplete?: number | boolean
  removeOnFail?: number | boolean
  attempts?: number
  backoff?: number
}

export interface ILatestListenerJob {
  contractAddress: string
}

export interface IProcessEventListenerJob {
  contractAddress: string
  event: ethers.EventLog | ethers.Log
}

export interface IContracts {
  [key: string]: ethers.Contract
}

export type ProcessEventOutputType = {
  jobData:
    | ITornListenerWorker
    | ISpoilClaimerListenerWorker
    | ISacrificeListenerWorker
    | IRewardListenerWorker
    | IReferralListenerWorker
    | IShardTransferListenerWorker
    | IMarketplaceListenerWorker
    | null
  jobId: string
  jobName: string
  jobQueueSettings?: IJobQueueSettings
}

export type IListeners = {
  [index: string]: (redisClient: RedisClientType, logger: Logger) => void
}

export interface ITornMinted {
  owner: string
  tokenId: bigint
  tokenType: bigint
}

export interface IPaticipated {
  account: string
  tokenId: number
  owner: string
  gameType: bigint
  gameId: bigint
  energy: bigint
}

export interface ISacrifice {
  account: string
  tokenId: bigint
  owner: string
  sacrificeType: bigint
  requireRitualStone: boolean
}

export interface IReward {
  account: string
  spoilId: bigint
  tokenId: bigint
  owner: string
}

export interface IReferralClaim {
  account: string
  tokenId: bigint
  owner: string
  rewardType: bigint
}

export interface IItemBought {
  id: bigint
  itemId: bigint
  recipient: string
  amount: bigint
  itemType: bigint
  sender: string
}

export interface IShardTransfer {
  from: string
  to: string
  value: bigint
}

export type ListenerInitType = 'latest' | 'clear' | number
