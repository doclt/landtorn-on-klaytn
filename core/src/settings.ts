import * as dotenv from 'dotenv'
dotenv.config()

export const DEPLOYMENT_NAME = process.env.DEPLOYMENT_NAME || 'landtorn'

export const LISTENER_DELAY = Number(process.env.LISTENER_DELAY) || 1500

export const LISTENER_TORN_LATEST_QUEUE_NAME = `${DEPLOYMENT_NAME}-listener-torn-latest-queue`
export const LISTENER_TORN_PROCESS_EVENT_QUEUE_NAME = `${DEPLOYMENT_NAME}-listener-torn-process-event-queue`
export const WORKER_TORN_QUEUE_NAME = `${DEPLOYMENT_NAME}-worker-torn-queue`

export const LISTENER_SPOIL_CLAIMER_LATEST_QUEUE_NAME = `${DEPLOYMENT_NAME}-listener-spoil-claimer-latest-queue`
export const LISTENER_SPOIL_CLAIMER_PROCESS_EVENT_QUEUE_NAME = `${DEPLOYMENT_NAME}-listener-spoil-claimer-process-event-queue`
export const WORKER_SPOIL_CLAIMER_QUEUE_NAME = `${DEPLOYMENT_NAME}-worker-spoil-claimer-queue`

export const LISTENER_SACRIFICE_LATEST_QUEUE_NAME = `${DEPLOYMENT_NAME}-listener-sacrifice-latest-queue`
export const LISTENER_SACRIFICE_PROCESS_EVENT_QUEUE_NAME = `${DEPLOYMENT_NAME}-listener-sacrifice-process-event-queue`
export const WORKER_SACRIFICE_QUEUE_NAME = `${DEPLOYMENT_NAME}-worker-sacrifice-queue`

export const LISTENER_REWARD_LATEST_QUEUE_NAME = `${DEPLOYMENT_NAME}-listener-reward-latest-queue`
export const LISTENER_REWARD_PROCESS_EVENT_QUEUE_NAME = `${DEPLOYMENT_NAME}-listener-reward-process-event-queue`
export const WORKER_REWARD_QUEUE_NAME = `${DEPLOYMENT_NAME}-worker-reward-queue`

export const LISTENER_REFERAL_LATEST_QUEUE_NAME = `${DEPLOYMENT_NAME}-listener-referral-latest-queue`
export const LISTENER_REFERAL_PROCESS_EVENT_QUEUE_NAME = `${DEPLOYMENT_NAME}-listener-referral-process-event-queue`
export const WORKER_REFERAL_QUEUE_NAME = `${DEPLOYMENT_NAME}-worker-referral-queue`

export const LISTENER_SHARD_LATEST_QUEUE_NAME = `${DEPLOYMENT_NAME}-listener-shard-latest-queue`
export const LISTENER_SHARD_PROCESS_EVENT_QUEUE_NAME = `${DEPLOYMENT_NAME}-listener-shard-process-event-queue`
export const WORKER_SHARD_QUEUE_NAME = `${DEPLOYMENT_NAME}-worker-shard-queue`

export const LISTENER_MARKETPLACE_LATEST_QUEUE_NAME = `${DEPLOYMENT_NAME}-listener-marketplace-latest-queue`
export const LISTENER_MARKETPLACE_PROCESS_EVENT_QUEUE_NAME = `${DEPLOYMENT_NAME}-listener-marketplace-process-event-queue`
export const WORKER_MARKETPLACE_QUEUE_NAME = `${DEPLOYMENT_NAME}-worker-marketplace-queue`

export const REMOVE_ON_COMPLETE = 500
export const REMOVE_ON_FAIL = 1_000
export const CONCURRENCY = 12

export const LOG_LEVEL = process.env.LOG_LEVEL || 'info'
export const LOG_DIR = process.env.LOG_DIR || './'

export const REDIS_HOST = process.env.REDIS_HOST || 'localhost'
export const REDIS_PORT = process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379
export const PROVIDER_URL = process.env.PROVIDER_URL || 'http://127.0.0.1:8545'
export const API_URL = process.env.API_URL || 'http://localhost:3006'
export const TORN_ADDRESS = process.env.TORN_ADDRESS || ''
export const SPOIL_ADDRESS = process.env.SPOIL_ADDRESS || ''

export const SPOIL_CLAIMER_ADDRESS = process.env.SPOIL_CLAIMER_ADDRESS || ''
export const SPOIL_MINTER_PRIV = process.env.SPOIL_MINTER_PRIV || ''
export const OPENSEA_API_KEY = process.env.OPENSEA_API_KEY || ''
export const SHARD_ADDRESS = process.env.SHARD_ADDRESS || ''
export const MYTHIC_ADDRESS = process.env.MYTHIC_ADDRESS || ''
export const REWARD_ADDRESS = process.env.REWARD_ADDRESS || ''
export const REFERRAL_ADDRESS = process.env.REFERRAL_ADDRESS || ''
export const REFERRAL_OPERATOR_PRIV = process.env.REFERRAL_OPERATOR_PRIV || ''

export const MARKETPLACE_ADDRESS = process.env.MARKETPLACE_ADDRESS || ''

export const DUNGEON_BASE_RATIO = process.env.DUNGEON_BASE_RATIO
  ? Number(process.env.DUNGEON_BASE_RATIO)
  : 1

export const LANDTORN_API_URL = process.env.LANDTORN_API_URL || ''
//
export const SACRIFICE_ADDRESS = process.env.SACRIFICE_ADDRESS || ''

export const MYTHIC_MINTER_PRIV = process.env.MYTHIC_MINTER_PRIV || ''

export const BULLMQ_CONNECTION = {
  concurrency: CONCURRENCY,
  connection: {
    host: REDIS_HOST,
    port: REDIS_PORT
  }
}

export const LISTENER_JOB_SETTINGS = {
  removeOnComplete: REMOVE_ON_COMPLETE,
  removeOnFail: REMOVE_ON_FAIL,
  attempts: 10,
  backoff: 1_000
}

export const WORKER_JOB_SETTINGS = {
  removeOnComplete: REMOVE_ON_COMPLETE,
  removeOnFail: REMOVE_ON_FAIL,
  attempts: 10,
  backoff: 1_000
}

export const ALL_QUEUES = [LISTENER_TORN_LATEST_QUEUE_NAME, WORKER_TORN_QUEUE_NAME]

export function getObservedBlockRedisKey(contractAddress: string) {
  return `${contractAddress}-listener-${DEPLOYMENT_NAME}`
}
