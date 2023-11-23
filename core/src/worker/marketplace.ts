import { Worker } from 'bullmq'
import { Logger } from 'pino'
import type { RedisClientType } from 'redis'
import { IActionTx, IMarketplaceListenerWorker } from '../types'
import {
  accountInfor,
  actionTx,
  createMarketTx,
  increaseEnergy,
  isValidMarketRequest,
  marketItem,
  referralUpdate,
  refreshSettlerMeta,
  updateMythic,
  updateSpoil,
  updateTorn
} from '../apis'
import { BULLMQ_CONNECTION, WORKER_MARKETPLACE_QUEUE_NAME } from '../settings'
import { parseEther } from 'ethers'
import { parseShard } from '../utils'
import { spoilBalanceOf } from './utils'

const FILE_NAME = import.meta.url

export async function buildWorker(redisClient: RedisClientType, _logger: Logger) {
  const logger = _logger.child({ name: 'referralWorker', file: FILE_NAME })
  const worker = new Worker(WORKER_MARKETPLACE_QUEUE_NAME, await job(_logger), BULLMQ_CONNECTION)
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
  const logger = _logger.child({ name: 'referralJob', file: FILE_NAME })

  async function wrapper(job) {
    const inData: IMarketplaceListenerWorker = job.data
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

export async function processEvent(data: IMarketplaceListenerWorker, _logger: Logger) {
  const logger = _logger.child({ name: 'processMarketplaceJob', file: FILE_NAME })
  const { account, txHash, id, itemId, itemType, amount, owner } = data
  const action = id == 1 ? 11 : 10 //11: mint baron, 10:taven
  const buytx: IActionTx = {
    recipient: account,
    txHash,
    action,
    tornId: 0,
    note: 'Buy item'
  }
  //check account exist
  const accInfor = await accountInfor({ account })
  const itemSetting = await marketItem({ id })
  const referralRewardAmount =
    itemSetting.currency == 'ETH'
      ? parseEther(itemSetting.price.toString()) * BigInt(amount)
      : parseShard(itemSetting.price) * amount

  if (!accInfor || !accInfor?.tokenId) {
    buytx.note = `Buy item: account [${account}] does not exist`
    await actionTx({ tx: [buytx], logger })
    return
  }

  if (itemType == 2) {
    //check existed Isekar, Florki coin
    const balance = await spoilBalanceOf(account, itemId)
    if (balance != 1) {
      buytx.note = `Buy item: account [${account}] already have spoil id:[${itemId}]`
      await actionTx({ tx: [buytx], logger })
      return
    }
  }

  if (itemType == 4) {
    //check existed enery package(vials)
    const valids = await isValidMarketRequest({ account, marketId: itemType })
    const itemValid = valids.find((f) => f.id == id)
    if (!itemValid?.isValid) {
      buytx.note = `Buy item: account [${account}] reach limit for this item id:[${itemId}]`
      await actionTx({ tx: [buytx], logger })
      return
    }
  }

  //baron
  if (itemType == 1) {
    //update torn type to Baron
    await updateTorn({ account, typeId: 2 })

    //increase energy
    const itemInfor = await marketItem({ id: 3 }) //life vial package
    await increaseEnergy({ account, energy: itemInfor.value })
    // spoil
    await updateSpoil({ account, spoilId: 275, amount: 1 })
    await updateSpoil({ account, spoilId: 276, amount: 1 })

    await updateMythic({ account, mythicId: 13, amount: 1 })
  }
  //update spoil
  else if (itemType == 2) {
    await updateSpoil({ account, spoilId: itemId, amount: 1 })
  } else if (itemType == 3) {
    //update mythic
    await updateMythic({ account, mythicId: itemId, amount: 1 })
  } else if (itemType == 4) {
    //update item

    const itemInfor = await marketItem({ id: id }) //life vial package
    await increaseEnergy({ account, energy: itemInfor.value * amount })
  }

  //add referral reward
  await referralUpdate({
    account,
    amount: Number(referralRewardAmount),
    txHash,
    action,
    sender: owner,
    logger
  })
  //update market transaction
  await createMarketTx({
    txHash,
    account,
    sender: owner,
    marketId: id,
    amount,
    transactionTime: new Date(),
    logger
  })

  //refresh opensea meta
  await refreshSettlerMeta(accInfor?.tokenId)
  logger.info('complete')
}
