import { parseArgs } from 'node:util'
import type { RedisClientType } from 'redis'
import { createClient } from 'redis'
import { IWorkers } from './types'
import { buildLogger } from '../logger'
import { REDIS_HOST, REDIS_PORT } from '../settings'
import { worker as tornWorker } from './torn'
import { worker as claimerWorker } from './claimer'
import { buildSacrificeWorker } from './sacrifice'
import { buildRewardWorker } from './reward'
import { buildReferralWorker } from './referral'
import { buildShardWorker } from './shard'
import { buildWorker as buildMarketWorker } from './marketplace'

const WORKERS: IWorkers = {
  TORN: tornWorker,
  CLAIMER: claimerWorker,
  SACRIFICE: buildSacrificeWorker,
  REWARD: buildRewardWorker,
  REFERRAL: buildReferralWorker,
  SHARD: buildShardWorker,
  MARKETPLACE: buildMarketWorker
}

const LOGGER = buildLogger('worker')

async function main() {
  const worker = loadArgs()

  const redisClient: RedisClientType = createClient({ url: `redis://${REDIS_HOST}:${REDIS_PORT}` })
  await redisClient.connect()

  WORKERS[worker](redisClient, LOGGER)

  LOGGER.info('Worker launched')
}

function loadArgs() {
  const {
    values: { worker }
  } = parseArgs({
    options: {
      worker: {
        type: 'string'
      }
    }
  })

  if (!worker) {
    throw Error('Missing --worker argument.')
  }

  if (!Object.keys(WORKERS).includes(worker)) {
    throw Error(`${worker} is not supported worker.`)
  }

  return worker
}

main().catch((e) => {
  LOGGER.error(e)
  process.exitCode = 1
})
