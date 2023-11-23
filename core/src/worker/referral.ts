import { Worker } from 'bullmq'
import { Logger } from 'pino'
import type { RedisClientType } from 'redis'
import { IActionTx, IReferralListenerWorker } from '../types'
import { actionTx, blackList, referralClaim, referralReward, updateReward } from '../apis'
import { BULLMQ_CONNECTION, REFERRAL_OPERATOR_PRIV, WORKER_REFERAL_QUEUE_NAME } from '../settings'
import { ethTransfer, shardTransfer, tornOwnerOf } from './utils'
import { TransactionReceipt, parseEther } from 'ethers'
import { parseShard } from '../utils'

const FILE_NAME = import.meta.url

export async function buildReferralWorker(redisClient: RedisClientType, _logger: Logger) {
  const logger = _logger.child({ name: 'referralWorker', file: FILE_NAME })
  const worker = new Worker(WORKER_REFERAL_QUEUE_NAME, await job(_logger), BULLMQ_CONNECTION)
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
    const inData: IReferralListenerWorker = job.data
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
export async function processEvent(data: IReferralListenerWorker, _logger: Logger) {
  const logger = _logger.child({ name: 'processReferralJob', file: FILE_NAME })

  //get account reward
  const { account, txHash, tokenId, owner } = data
  const claimTx: IActionTx = {
    recipient: owner,
    txHash,
    action: 12, //claim
    tornId: tokenId,
    note: 'send referral reward success'
  }
  //check owner account
  let ownerToken = ''
  const accBlacklist = await blackList({ account })
  if (accBlacklist && accBlacklist.reason == 'Sacrifice') {
    ownerToken = accBlacklist.recipient
  } else {
    ownerToken = await tornOwnerOf(tokenId)
  }
  if (ownerToken != owner) {
    claimTx.note = `referral claim: owner [${owner}] is invalid - actual:[${ownerToken}]`
    await actionTx({ tx: [claimTx], logger })
    return
  }

  const rewards = await referralReward({ account, logger })
  const claimReward = rewards.find((f) => f.rewardTypeId == data.rewardType)
  //send reward

  let sendRewardTx: TransactionReceipt | null = null
  let rewardAvailable = 0
  if (claimReward && claimReward.amount - claimReward.claimed > 0) {
    rewardAvailable = claimReward.amount - claimReward.claimed

    try {
      //update reward
      const updateClanReward = {
        txHash,
        amount:
          data.rewardType == 1
            ? parseShard(rewardAvailable)
            : Number(parseEther(rewardAvailable.toString())),
        recipient: owner,
        rewardTypeId: data.rewardType,
        account
      }
      await updateReward(updateClanReward)
      if (data.rewardType == 1) {
        //shard
        sendRewardTx = await shardTransfer(owner, rewardAvailable, REFERRAL_OPERATOR_PRIV)
      } else if (data.rewardType == 2) {
        //send eth
        sendRewardTx = await ethTransfer(owner, rewardAvailable, REFERRAL_OPERATOR_PRIV)
      }
    } catch (e) {
      claimTx.note = `send referral reward error`
      logger.error(`send referral reward error ${e}`)
    }
  } else {
    claimTx.note = `send referral reward: reward not found`
  }

  await actionTx({ tx: [claimTx], logger })
  if (sendRewardTx) {
    const sendReward = {
      txHash: sendRewardTx.hash,
      amount: parseShard(rewardAvailable),
      recipient: owner,
      rewardTypeId: data.rewardType,
      account
    }
    await referralClaim({ ...sendReward, logger })
  }
  logger.info('complete')
}
