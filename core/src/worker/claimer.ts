import { Worker } from 'bullmq'
import { Logger } from 'pino'
import type { RedisClientType } from 'redis'
import {
  IBlackList,
  ISpoilClaimerListenerWorker,
  ITransaction,
  RewardData,
  Transaction
} from '../types'

import {
  BULLMQ_CONNECTION,
  DUNGEON_BASE_RATIO,
  SPOIL_ADDRESS,
  WORKER_SPOIL_CLAIMER_QUEUE_NAME
} from '../settings'
import { dungeonSetting, mythicMintBatch, rewardDungeon, spoilMintBatch } from './utils'
import {
  addTransaction,
  addBlackList,
  blackList,
  decreaseEnergy,
  energy,
  spoil,
  mythic,
  accountBalance,
  refreshSettlerMeta,
  isValidTx,
  functionSpoil,
  updateSpoil,
  sacrificeData,
  updateMythic
} from '../apis'
import { Reward } from './types'

const FILE_NAME = import.meta.url

export async function worker(redisClient: RedisClientType, _logger: Logger) {
  const logger = _logger.child({ name: 'worker', file: FILE_NAME })
  const worker = new Worker(WORKER_SPOIL_CLAIMER_QUEUE_NAME, await job(_logger), BULLMQ_CONNECTION)
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
  const logger = _logger.child({ name: 'claimerJob', file: FILE_NAME })

  async function wrapper(job) {
    const inData: ISpoilClaimerListenerWorker = job.data
    try {
      //generate metadata
      await processDungeon(inData, logger)
    } catch (e) {
      logger.error(e)
      throw e
    }
  }

  return wrapper
}

export async function processDungeon(data: ISpoilClaimerListenerWorker, _logger: Logger) {
  const logger = _logger.child({ name: 'processDJob', file: FILE_NAME })
  //check transacion vaid before process
  const isValid = await isValidTx({ hash: data.txHash })
  if (!isValid) {
    logger.info(`tx hash invalid`, data.txHash)
    return
  }
  //check black list
  const transactions: Transaction[] = []
  const tx: Transaction = {
    action: 3, // 'participate'
    txHash: data.txHash
  }

  let message: string = ''
  const action: ITransaction = {
    transactions,
    recipient: data.account,
    gameId: data.gameId,
    gameType: data.gameType,
    rewardList: [],
    contract: SPOIL_ADDRESS,
    tornId: data.tokenId
  }

  const accBlackList = await blackList({ account: data.account, logger })
  if (accBlackList) {
    logger.warn(`[${data.txHash}]: Account is dead`)
    message = 'Account is dead'
    tx.note = message
    action.transactions = [tx]
    await addTransaction({ tx: action, logger })
    return
  }
  //check and update energy
  const energyCount = await energy({ account: data.account, logger })
  if (energyCount.energy < data.energy) {
    logger.warn(`[${data.txHash}]: Insufficient energy`)
    message = 'Insufficient energy'
    tx.note = message
    action.transactions = [tx]
    await addTransaction({ tx: action, logger })
    return
  }

  const dSetting = await dungeonSetting(data.gameType)
  if (!dSetting || dSetting.DungeonSetting.length == 0) {
    logger.error('Dungeon is not support now')
    message = 'Dungeon is not support now'
    tx.note = message
    action.transactions = [tx]
    await addTransaction({ tx: action, logger })
    return
  }

  const { atk, def } = dSetting
  const acc = await accountBalance({ tornId: data.tokenId, logger })
  const itemIds = await Promise.all(
    //test
    new Array(data.energy).fill(0).map(async () => {
      let rewardResult: Reward | undefined = {
        rewardName: 'Nothing',
        rewardType: 0
      } //get random reward name
      const reward: {
        tokenId: number
        type: number
      } = {
        tokenId: 0,
        type: 1 //0: death, 1: spoil, 2:mythic
      }
      if (acc) {
        let baseRatio = 1
        if (acc.balance.atk >= atk && acc.balance.def >= def) {
          baseRatio = 1
        } else {
          baseRatio = DUNGEON_BASE_RATIO
        }
        rewardResult = await rewardDungeon(
          dSetting.DungeonSetting,
          baseRatio,
          acc.balance.enchanted || 0
        )
        //rewardResult.rewardName = rw?.rewardName || ''
      }
      if (rewardResult) {
        switch (rewardResult.rewardName) {
          case 'Nothing':
            logger.info('receive nothing')
            reward.type = -1 //nothing
            break
          case 'Dead':
            reward.tokenId = -1
            reward.type = 0
            break
          case 'RitualStone':
            reward.tokenId = 70 //spoil Retual Stone
            reward.type = 1
            break
          default:
            if (rewardResult.rewardType == 1) {
              //spoil
              const spoilInfo = await spoil({
                rewardName: rewardResult.rewardName,
                dungeonType: data.gameType,
                logger
              })
              reward.tokenId = spoilInfo.id
              reward.type = 1
            } else if (rewardResult.rewardType == 2) {
              //mythic
              const mythics = await mythic({ logger })
              const mythicInfo = mythics.find((f) => f.name == rewardResult?.rewardName)
              reward.tokenId = mythicInfo?.id || 0
              reward.type = 2
            }
            break
        }
      }
      return reward
    })
  )
  let gItemIds: RewardData[] = []
  itemIds.forEach((v) => {
    const spoil = gItemIds.find((f) => f.id === v.tokenId)
    if (!spoil) {
      gItemIds.push({ id: v.tokenId, amount: 1, type: v.type })
    } else {
      spoil.amount += 1
    }
  })

  if (gItemIds.find((f) => f.id == -1)) {
    //check if account has isekar florki coin
    await decreaseEnergy({ account: data.account, energy: data.energy, logger })
    const fSpoils = await functionSpoil({ account: data.account })
    //has func spoil
    const ISekarId = 275
    const FlorkiId = 276
    if (fSpoils.find((f) => f.spoilId == ISekarId && f.amount > 0)) {
      //use isekar coin: descrease coin and keep alive
      await updateSpoil({ account: data.account, spoilId: ISekarId, amount: -1 })
      message = `You died in dungeon: use isekar and you keep alive`
      gItemIds = gItemIds.map((m) => {
        if (m.id == -1) m.type = 3 //use isekar coin
        return m
      })
    } else {
      if (fSpoils.find((f) => f.spoilId == FlorkiId && f.amount > 0)) {
        //use florki coin: descrease coin and send mythic
        await updateSpoil({ account: data.account, spoilId: FlorkiId, amount: -1 })
        //get mythics of account and send them to wallet
        const accountReward = await sacrificeData({
          account: data.account,
          type: 4, //only mythic
          logger
        })
        const { mythics } = accountReward[0]
        if (mythics.length > 0) {
          const mythicIds = mythics.map((m) => m.mythicId)
          const mythicAmounts = mythics.map((m) => m.amount)
          /* eslint-disable  @typescript-eslint/no-explicit-any */
          let txMinMythic: any
          try {
            txMinMythic = await mythicMintBatch(data.owner, mythicIds, mythicAmounts)
            message = 'Mint Mythic sucess: use Florki coin'
          } catch (err) {
            message = 'Mint Mythic error'
          }
          const tx: Transaction = {
            action: 2, // 'mint reward'
            txHash: txMinMythic.hash,
            note: `${message} : ${data.owner}`
          }
          transactions.push(tx)
        }

        message = `You died in dungeon: use Florki - you receive mythics`
        gItemIds = gItemIds.map((m) => {
          if (m.id == -1) m.type = 4 //use isekar coin
          return m
        })
        for (let i = 0; i < mythics.length; i++) {
          const mythic = mythics[i]
          await updateMythic({
            account: data.account,
            mythicId: mythic.mythicId,
            amount: -mythic.amount
          })
        }
      }
      //process for dead
      const blData: IBlackList = {
        account: data.account,
        txHash: data.txHash,
        reason: 'Died in Dungeon'
      }
      await addBlackList({ data: blData, logger })
      message = `You died in dungeon`
    }
    tx.note = message
    action.rewardList = gItemIds
  } else {
    tx.note = `Participated`
    const mintSpoilIds = gItemIds.filter((f) => f.id != 0 && f.type == 1).map((m) => m.id)
    const mintSpoilAmounts = gItemIds.filter((f) => f.id != 0 && f.type == 1).map((m) => m.amount)
    //mint mythic
    const mintMythicIds = gItemIds.filter((f) => f.id != 0 && f.type == 2).map((m) => m.id)
    const mintMythicAmounts = gItemIds.filter((f) => f.id != 0 && f.type == 2).map((m) => m.amount)
    let mintStatus = 1
    let mintTx
    let mintSuccess: boolean = true
    if (mintSpoilIds.length > 0) {
      try {
        mintTx = await spoilMintBatch(data.account, mintSpoilIds, mintSpoilAmounts)
        message = 'mint Spoil success'
      } catch (err) {
        logger.error(`[${mintTx?.hash}] mint spoil transaction fail: ${err}`)
        message = 'mint spoil fails'
      }
      mintStatus = mintTx?.status
      if (mintStatus == 0) {
        message = `mint spoil fails`
        mintSuccess = false
      }
      const tx: Transaction = {
        action: 2, // 'mint reward'
        txHash: mintTx.hash,
        note: message
      }
      transactions.push(tx)
    }
    if (mintMythicIds.length > 0) {
      try {
        mintTx = await mythicMintBatch(data.account, mintMythicIds, mintMythicAmounts)
        message = 'mint Mythic success'
      } catch (err) {
        logger.error(`[${mintTx?.hash}] mint Mythic transaction fail: ${err}`)
        message = 'mint Mythic fails'
      }
      mintStatus = mintTx?.status
      if (mintStatus == 0) {
        message = `mint Mythic fails`
        mintSuccess = false
      }
      const tx: Transaction = {
        action: 2, // 'mint reward'
        txHash: mintTx.hash,
        note: message
      }
      transactions.push(tx)
    }
    action.rewardList = gItemIds
    if (!mintSuccess) {
      logger.error(`[${data.txHash}] transaction fail`)
      message = `transaction fail`
    } else await decreaseEnergy({ account: data.account, energy: data.energy, logger })
  }
  transactions.push(tx) //participate tx
  action.transactions = transactions
  await addTransaction({ tx: action, logger })
  //refresh metadata
  await refreshSettlerMeta(data.tokenId)
  logger.info(`[${data.txHash}] ${message}`)
}
