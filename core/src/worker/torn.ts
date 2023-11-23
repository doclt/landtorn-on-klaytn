import { Worker } from 'bullmq'
import { Logger } from 'pino'
import type { RedisClientType } from 'redis'
import { ITornListenerWorker } from '../types'

import { WORKER_TORN_QUEUE_NAME, BULLMQ_CONNECTION } from '../settings'
import { insertTorn } from '../apis'

const FILE_NAME = import.meta.url

export async function worker(redisClient: RedisClientType, _logger: Logger) {
  const logger = _logger.child({ name: 'worker', file: FILE_NAME })
  const worker = new Worker(WORKER_TORN_QUEUE_NAME, await job(_logger), BULLMQ_CONNECTION)
  worker.on('error', (e) => {
    logger.error(e)
  })
  async function handleExit() {
    logger.info('Exiting. Wait for graceful shutdown.')

    await redisClient.quit()
    await worker.close()
  }
  process.on('SIGINT', handleExit)
  process.on('SIGTERM', handleExit)
}

export async function job(_logger: Logger) {
  const logger = _logger.child({ name: 'tornJob', file: FILE_NAME })

  async function wrapper(job) {
    const inData: ITornListenerWorker = job.data
    logger.debug(inData, 'inData')
    try {
      //generate metadata
      await processNewTorn(inData, logger)
    } catch (e) {
      logger.error(e)
      throw e
    }
  }

  return wrapper
}

async function processNewTorn(data: ITornListenerWorker, _logger: Logger) {
  await insertTorn({ data, logger: _logger })
}
