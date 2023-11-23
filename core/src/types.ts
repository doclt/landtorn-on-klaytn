import { Queue } from 'bullmq'

export interface ITornListenerWorker {
  txHash: string
  owner: string
  tokenId: number
  tokenType: number
  tokenContract: string
}
export interface IListenerConfig {
  id: string
  address: string
  eventName: string
  chain: string
}

export interface MockQueue {
  add: any // eslint-disable-line @typescript-eslint/no-explicit-any
  process: any // eslint-disable-line @typescript-eslint/no-explicit-any
  on: any // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface ISpoilClaimerListenerWorker {
  txHash: string
  owner: string
  account: string
  gameType: number
  gameId: number
  energy: number
  tokenId: number
}

export interface ISacrificeListenerWorker {
  txHash: string
  owner: string
  account: string
  tokenId: number
  sacrificeType: number
  requireRitualStone: boolean
}

export interface IRewardListenerWorker {
  txHash: string
  owner: string
  account: string
  tokenId: number
  spoilId: number
}

export interface IReferralListenerWorker {
  txHash: string
  owner: string
  account: string
  tokenId: number
  rewardType: number
}

export interface IShardTransferListenerWorker {
  txHash: string
  from: string
  to: string
  value: number
}

export interface IMarketplaceListenerWorker {
  txHash: string
  owner: string
  account: string
  itemType: number
  id: number
  itemId: number
  amount: number
}

export interface ITransaction {
  transactions: Transaction[]
  recipient: string
  gameId: number
  gameType: number
  rewardList: RewardData[]
  contract: string
  note?: string
  tornId: number
}

export interface IActionTx {
  recipient: string
  txHash: string
  action: number
  tornId: number
  note?: string
}

export interface RewardData {
  id: number
  amount: number
  type: number
}
export interface Transaction {
  txHash: string
  action: number
  note?: string
}

export interface IBlackList {
  account: string

  txHash: string

  reason: string
}
export interface SacrificeReward {
  type: number
  shard: number
  mythics: { account: string; mythicId: number; amount: number }[]
  fee: number
}

export interface SacrificeReceived {
  sacrificeTx: string
  txHash: string
  amount: number
  tokenId: number
}

export interface IDungeonSetting {
  id: number
  dungeonTypeId: number
  rewardName: string
  ratio: number
  rewardType: number
  range: number
}

export interface ReferralReward {
  name: string
  amount: number
  claimed: number
  rewardTypeId: number
}

export interface FunctionSpoil {
  account: string
  spoilId: number
  amount: number
}
export type QueueType = Queue | MockQueue
