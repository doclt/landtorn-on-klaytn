import { Worker } from 'bullmq'
import { Logger } from 'pino'
import type { RedisClientType } from 'redis'
import { IActionTx, IRewardListenerWorker } from '../types'
import { actionTx, updateSpoil } from '../apis'
import { BULLMQ_CONNECTION, WORKER_REWARD_QUEUE_NAME } from '../settings'

const FILE_NAME = import.meta.url

export async function buildRewardWorker(redisClient: RedisClientType, _logger: Logger) {
  const logger = _logger.child({ name: 'worker', file: FILE_NAME })
  const worker = new Worker(WORKER_REWARD_QUEUE_NAME, await job(_logger), BULLMQ_CONNECTION)
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
  const logger = _logger.child({ name: 'rewardJob', file: FILE_NAME })

  async function wrapper(job) {
    const inData: IRewardListenerWorker = job.data
    logger.debug(inData, 'inData')
    try {
      await processEvent(inData, logger)
    } catch (e) {
      logger.error(`Reward process error: tx[${inData.txHash}] - ${e} `)
      throw e
    }
  }

  return wrapper
}

//
export async function processEvent(data: IRewardListenerWorker, _logger: Logger) {
  const logger = _logger.child({ name: 'processRewardJob', file: FILE_NAME })

  //get account reward
  const { account, txHash, tokenId } = data

  //get transaction receipt
  const txs: IActionTx[] = []
  const claimTx: IActionTx = {
    recipient: account,
    txHash,
    action: 8, //claim reward
    tornId: tokenId
  }
  txs.push(claimTx)

  await actionTx({ tx: txs, logger })
  //update reward
  await updateSpoil({ account, spoilId: data.spoilId, amount: 1, logger })

  logger.info('send reward complete')
}
