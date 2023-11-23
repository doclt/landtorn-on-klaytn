import { Worker } from 'bullmq'
import { Logger } from 'pino'
import type { RedisClientType } from 'redis'
import { IActionTx, IBlackList, ISacrificeListenerWorker, SacrificeReceived } from '../types'

import { BULLMQ_CONNECTION, MYTHIC_MINTER_PRIV, WORKER_SACRIFICE_QUEUE_NAME } from '../settings'
import {
  accountBalance,
  actionTx,
  addBlackList,
  blackList,
  refreshSettlerMeta,
  sacrificeData,
  sacrificeReceived
} from '../apis'
import { formatEther } from 'ethers'
import { getTransaction, mythicMintBatch, shardTransfer } from './utils'

const FILE_NAME = import.meta.url

export async function buildSacrificeWorker(redisClient: RedisClientType, _logger: Logger) {
  const logger = _logger.child({ name: 'worker', file: FILE_NAME })
  const worker = new Worker(WORKER_SACRIFICE_QUEUE_NAME, await job(_logger), BULLMQ_CONNECTION)
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
  const logger = _logger.child({ name: 'sacrificeJob', file: FILE_NAME })

  async function wrapper(job) {
    const inData: ISacrificeListenerWorker = job.data
    logger.debug(inData, 'inData')
    try {
      await processEvent(inData, logger)
    } catch (e) {
      logger.error(`Sacrifice process error: tx[${inData.txHash}] - ${e} `)
      throw e
    }
  }

  return wrapper
}

//
export async function processEvent(data: ISacrificeListenerWorker, _logger: Logger) {
  const logger = _logger.child({ name: 'processSacrificeJob', file: FILE_NAME })
  //check blacklist
  const { account, txHash, tokenId, sacrificeType, owner } = data
  const txs: IActionTx[] = []
  const sacrificeTx: IActionTx = {
    recipient: owner,
    txHash,
    action: 5,
    tornId: tokenId,
    note: 'Sacrificed'
  }
  const accBlackList = await blackList({ account: data.account, logger })
  if (accBlackList) {
    logger.warn(`[${data.txHash}] Account is dead`)
    sacrificeTx.note = 'Account is dead'
    //
    await actionTx({ tx: [sacrificeTx], logger })
    return
  }
  //get account reward

  const accountReward = await sacrificeData({
    account,
    type: sacrificeType,
    logger
  })
  const { shard, mythics, fee } = accountReward[0]
  //get transaction receipt
  const tx = await getTransaction(txHash)
  const txValue = formatEther(tx?.value || 0)

  const sReward: SacrificeReceived[] = []
  const slippage = 0.05 //5%
  if (tx && Number(txValue) >= fee * (1 - slippage)) {
    //valid
    //mint mythic
    const mythicIds = mythics.map((m) => m.mythicId)
    const mythicAmounts = mythics.map((m) => m.amount)
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    let txMinMythic: any
    let message = 'Mint Mythic success'
    // 1000 shard power/ 1 mythic
    let shardRequire = false
    if (!data.requireRitualStone) {
      const accBalance = await accountBalance({ tornId: data.tokenId, logger })
      const mythicSum = mythicAmounts.reduce((p, c) => p + c, 0)
      shardRequire = accBalance.balance?.shardPower >= mythicSum * 1000
    }

    if (mythicIds.length > 0 && (data.requireRitualStone || shardRequire)) {
      try {
        txMinMythic = await mythicMintBatch(owner, mythicIds, mythicAmounts, MYTHIC_MINTER_PRIV)
      } catch (err) {
        message = 'Mint Mythic error'
      }
      const sendMythicTx: IActionTx = {
        recipient: owner,
        txHash: txMinMythic.hash,
        action: 6,
        tornId: tokenId,
        note: message
      }
      txs.push(sendMythicTx)

      mythics.forEach((f) => {
        const reward: SacrificeReceived = {
          sacrificeTx: txHash,
          txHash: txMinMythic.hash,
          amount: f.amount,
          tokenId: f.mythicId
        }
        sReward.push(reward)
      })
    }
    // mint shard
    if (shard > 0 && data.requireRitualStone) {
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      let sendShard: any
      let message = 'Mint shard success'
      try {
        sendShard = await shardTransfer(owner, shard, MYTHIC_MINTER_PRIV)
      } catch (err) {
        message = 'Mint shard error'
      }

      const sendShardTx: IActionTx = {
        recipient: owner,
        txHash: sendShard.hash,
        action: 7,
        tornId: tokenId,
        note: message
      }
      txs.push(sendShardTx)
      sReward.push({
        sacrificeTx: txHash,
        txHash: sendShard.hash,
        amount: shard,
        tokenId: 0
      })
    }
  } else {
    logger.warn(`tx invalid: tx value < fee [${data.txHash}]`)
    sacrificeTx.note = 'tx invalid: value < fee'
    //
  }
  txs.push(sacrificeTx)

  const blData: IBlackList = {
    account: data.account,
    txHash: data.txHash,
    reason: 'Sacrifice'
  }
  await addBlackList({ data: blData, logger })

  await actionTx({ tx: txs, logger })
  //sacrifice data
  await sacrificeReceived({ data: sReward, logger })
  //refresh metadata
  await refreshSettlerMeta(data.tokenId)
  logger.info('send reward complete')
}
