import { Worker } from 'bullmq'
import { Logger } from 'pino'
import type { RedisClientType } from 'redis'
import { IShardTransferListenerWorker } from '../types'
import { accountInfor, referralUpdate } from '../apis'
import { BULLMQ_CONNECTION, WORKER_SHARD_QUEUE_NAME } from '../settings'

const FILE_NAME = import.meta.url

export async function buildShardWorker(redisClient: RedisClientType, _logger: Logger) {
  const logger = _logger.child({ name: 'shardWorker', file: FILE_NAME })
  const worker = new Worker(WORKER_SHARD_QUEUE_NAME, await job(_logger), BULLMQ_CONNECTION)
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
  const logger = _logger.child({ name: 'shardTransferJob', file: FILE_NAME })
  async function wrapper(job) {
    const inData: IShardTransferListenerWorker = job.data
    logger.debug(inData, 'inData')
    try {
      await processEvent(inData, logger)
    } catch (e) {
      logger.error(`Shard transfer process error: tx[${inData.txHash}] - ${e} `)
      throw e
    }
  }
  return wrapper
}

//
export async function processEvent(data: IShardTransferListenerWorker, _logger: Logger) {
  const logger = _logger.child({ name: 'processReferralJob', file: FILE_NAME })
  //get account reward
  const { txHash, from, to, value } = data
  const acc = await accountInfor({ account: to, logger })
  if (!acc) return
  const action = 9 //enchantment
  //const shardAmount = formatUnits(value.toString(), 8)
  //console.log('amount', Number(shardAmount))
  await referralUpdate({
    account: to,
    amount: value,
    txHash,
    action,
    sender: from,
    logger
  })
  logger.info('complete')
}
