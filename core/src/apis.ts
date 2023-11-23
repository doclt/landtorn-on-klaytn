import { Logger } from 'pino'
import { buildUrl } from './utils'
import { API_URL, LANDTORN_API_URL, OPENSEA_API_KEY, TORN_ADDRESS } from './settings'
import axios from 'axios'
import {
  FunctionSpoil,
  IActionTx,
  IBlackList,
  ITornListenerWorker,
  ITransaction,
  ReferralReward,
  SacrificeReceived,
  SacrificeReward
} from './types'
import { MythicData, SpoilData } from './worker/types'
const FILE_NAME = import.meta.url

export async function insertTorn({ data, logger }: { data: ITornListenerWorker; logger?: Logger }) {
  try {
    const endpoint = buildUrl(API_URL, 'Torn')
    const response = (await axios.post(endpoint, data))?.data
    return response
  } catch (e) {
    logger?.error({ name: 'insertTorn', file: FILE_NAME, ...e }, 'error')
    throw e
  }
}

export async function spoil({
  rewardName,
  dungeonType,
  logger
}: {
  rewardName: string
  dungeonType: number
  logger?: Logger
}): Promise<SpoilData> {
  try {
    const endpoint = buildUrl(API_URL, 'spoil')
    const response = (await axios.get(`${endpoint}/${dungeonType}/${rewardName}`))?.data
    return response
  } catch (e) {
    logger?.error({ name: 'get reward', file: FILE_NAME, ...e }, 'error')
    throw e
  }
}

export async function addTransaction({ tx, logger }: { tx: ITransaction; logger?: Logger }) {
  try {
    const endpoint = buildUrl(API_URL, 'transaction')
    const response = await axios.post(`${endpoint}`, tx)
    return response.status
  } catch (e) {
    logger?.error({ name: 'add new transaction', file: FILE_NAME, ...e }, 'error')
    // throw e
  }
}

export async function actionTx({ tx, logger }: { tx: IActionTx[]; logger?: Logger }) {
  try {
    const endpoint = buildUrl(API_URL, 'transaction')
    const response = await axios.post(`${endpoint}/tx`, tx)
    return response.status
  } catch (e) {
    logger?.error({ name: 'add new transaction', file: FILE_NAME, ...e }, 'error')
    throw e
  }
}

export async function energy({ account, logger }: { account: string; logger?: Logger }) {
  try {
    const endpoint = buildUrl(LANDTORN_API_URL, 'account')
    const response = (await axios.get(`${endpoint}/energy/${account}`))?.data
    return response
  } catch (e) {
    logger?.error({ name: 'Account energy', file: FILE_NAME, ...e }, 'error')
    throw e
  }
}

export async function accountInfor({ account, logger }: { account: string; logger?: Logger }) {
  try {
    const endpoint = buildUrl(API_URL, 'account')
    const response = (await axios.get(`${endpoint}/account/${account}`))?.data
    return response
  } catch (e) {
    logger?.error({ name: 'Account infor', file: FILE_NAME, ...e }, 'error')
    throw e
  }
}

export async function decreaseEnergy({
  account,
  energy,
  logger
}: {
  account: string
  energy: number
  logger?: Logger
}) {
  try {
    const endpoint = buildUrl(API_URL, 'account')
    const response = await axios.post(`${endpoint}/energy/${account}/${energy}`)
    return response
  } catch (e) {
    logger?.error({ name: 'decrese energy', file: FILE_NAME, ...e }, 'error')
    throw e
  }
}

export async function blackList({ account, logger }: { account: string; logger?: Logger }) {
  try {
    const endpoint = buildUrl(API_URL, 'account')
    const response = (await axios.get(`${endpoint}/blacklist/${account}`))?.data
    return response
  } catch (e) {
    logger?.error({ name: 'Account energy', file: FILE_NAME, ...e }, 'error')
    throw e
  }
}

export async function addBlackList({ data, logger }: { data: IBlackList; logger?: Logger }) {
  try {
    const endpoint = buildUrl(API_URL, 'account')
    const response = (await axios.post(`${endpoint}/blacklist`, data))?.data
    return response
  } catch (e) {
    logger?.error({ name: 'Account energy', file: FILE_NAME, ...e }, 'error')
    throw e
  }
}

export async function accountBalance({ tornId, logger }: { tornId: number; logger?: Logger }) {
  try {
    const endpoint = buildUrl(LANDTORN_API_URL, 'account')
    const response = (await axios.get(`${endpoint}/infor/${tornId}`)).data
    return response
  } catch (e) {
    logger?.error({ name: 'Account infor', file: FILE_NAME, ...e }, 'error')
    throw e
  }
}

export async function sacrificeData({
  account,
  type,
  logger
}: {
  account: string
  type: number
  logger?: Logger
}) {
  try {
    const endpoint = buildUrl(LANDTORN_API_URL, 'account')
    const response: SacrificeReward[] = (
      await axios.get(`${endpoint}/sacrifice/${account}/${type}`)
    ).data
    return response
  } catch (e) {
    logger?.error({ name: 'Account infor', file: FILE_NAME, ...e }, 'error')
    throw e
  }
}

export async function sacrificeReceived({
  data,
  logger
}: {
  data: SacrificeReceived[]
  logger?: Logger
}) {
  try {
    const endpoint = buildUrl(API_URL, 'transaction')
    const response = (await axios.post(`${endpoint}/sacrificeReward`, data)).data
    return response
  } catch (e) {
    logger?.error({ name: 'sacrificeReward', file: FILE_NAME, ...e }, 'error')
    throw e
  }
}

export async function dungeonDistribution({ type, logger }: { type: number; logger?: Logger }) {
  try {
    const endpoint = buildUrl(LANDTORN_API_URL, 'dungeon')
    const response = (await axios.get(`${endpoint}/distribution/${type}`)).data
    return response
  } catch (e) {
    logger?.error({ name: 'dungeon infor', file: FILE_NAME, ...e }, 'error')
    throw e
  }
}

export async function updateSpoil({
  account,
  spoilId,
  amount,
  logger
}: {
  account: string
  spoilId: number
  amount: number
  logger?: Logger
}) {
  try {
    const endpoint = buildUrl(API_URL, 'account')
    const data = {
      account,
      spoilId,
      amount
    }
    const response = await axios.post(`${endpoint}/asset`, data)
    return response
  } catch (e) {
    logger?.error({ name: 'update asset', file: FILE_NAME, ...e }, 'error')
    throw e
  }
}

export async function mythic({ logger }: { logger?: Logger }): Promise<MythicData[]> {
  try {
    const endpoint = buildUrl(LANDTORN_API_URL, 'item')
    const response = (await axios.get(`${endpoint}/mythic`)).data
    return response
  } catch (e) {
    logger?.error({ name: 'mythic infor', file: FILE_NAME, ...e }, 'error')
    throw e
  }
}

const openseaHost = `https://api.opensea.io/v2`
const axiosOptions = {
  headers: {
    accept: 'application/json',
    'X-API-KEY': `${OPENSEA_API_KEY}`
  }
}

export async function refreshSettlerMeta(tokenId: number) {
  try {
    const endpoint = `${openseaHost}/chain/base/contract/${TORN_ADDRESS}/nfts/${tokenId}/refresh`
    await axios.post(endpoint, {}, axiosOptions)
  } catch (ex) {
    console.log('error refresh meta', ex)
  }
}

export async function referralReward({
  account,
  logger
}: {
  account: string
  logger?: Logger
}): Promise<ReferralReward[]> {
  try {
    const endpoint = buildUrl(LANDTORN_API_URL, 'referral')
    const response = (await axios.get(`${endpoint}/reward/${account}`)).data
    return response
  } catch (e) {
    logger?.error({ name: 'mythic infor', file: FILE_NAME, ...e }, 'error')
    throw e
  }
}

export async function referralClaim({
  recipient,
  amount,
  txHash,
  rewardTypeId,
  account,
  logger
}: {
  recipient: string
  amount: number
  txHash: string
  rewardTypeId: number
  account: string
  logger?: Logger
}) {
  try {
    const endpoint = buildUrl(API_URL, 'referral')
    const data = {
      txHash,
      recipient,
      amount,
      rewardTypeId,
      account
    }
    const response = await axios.post(`${endpoint}/claim`, data)
    return response
  } catch (e) {
    logger?.error({ name: 'referral claim', file: FILE_NAME, ...e }, 'error')
    throw e
  }
}

export async function updateReward({
  recipient,
  amount,
  txHash,
  rewardTypeId,
  account,
  logger
}: {
  recipient: string
  amount: number
  txHash: string
  rewardTypeId: number
  account: string
  logger?: Logger
}) {
  try {
    const endpoint = buildUrl(API_URL, 'referral')
    const data = {
      txHash,
      recipient,
      amount,
      rewardTypeId,
      account
    }
    const response = await axios.post(`${endpoint}/updateReward`, data)
    return response
  } catch (e) {
    logger?.error({ name: 'referral claim', file: FILE_NAME, ...e }, 'error')
    throw e
  }
}

export async function referralUpdate({
  account,
  amount,
  txHash,
  action,
  sender,
  logger
}: {
  account: string
  amount: number
  txHash: string
  action: number
  sender: string
  logger?: Logger
}) {
  try {
    const endpoint = buildUrl(API_URL, 'referral')
    const data = {
      txHash,
      account,
      amount,
      action,
      sender
    }
    const response = await axios.post(`${endpoint}`, data)
    return response
  } catch (e) {
    logger?.error({ name: 'referral claim', file: FILE_NAME, ...e }, 'error')
    throw e
  }
}

export async function accounts({ logger }: { logger?: Logger }) {
  try {
    const endpoint = buildUrl(API_URL, 'account')
    const response = (await axios.get(`${endpoint}/accountMany`))?.data
    return response
  } catch (e) {
    logger?.error({ name: 'Account by status infor', file: FILE_NAME, ...e }, 'error')
    throw e
  }
}

export async function updateTorn({
  account,
  typeId,
  logger
}: {
  account: string
  typeId: number
  logger?: Logger
}) {
  try {
    const endpoint = buildUrl(API_URL, 'account')
    const data = {
      account,
      tornTypeId: typeId
    }
    const response = await axios.post(`${endpoint}/upgradeTorn`, data)
    return response
  } catch (e) {
    logger?.error({ name: 'update torn', file: FILE_NAME, ...e }, 'error')
    throw e
  }
}

export async function increaseEnergy({
  account,
  energy,
  logger
}: {
  account: string
  energy: number
  logger?: Logger
}) {
  try {
    const endpoint = buildUrl(API_URL, 'account')
    const data = {
      account,
      energy
    }
    const response = await axios.post(`${endpoint}/increaseEnergy`, data)
    return response
  } catch (e) {
    logger?.error({ name: 'increaseEnergy torn', file: FILE_NAME, ...e }, 'error')
    throw e
  }
}

export async function updateMythic({
  account,
  mythicId,
  amount,
  logger
}: {
  account: string
  mythicId: number
  amount: number
  logger?: Logger
}) {
  try {
    const endpoint = buildUrl(API_URL, 'account')
    const data = {
      account,
      mythicId,
      amount
    }
    const response = await axios.post(`${endpoint}/updateMythic`, data)
    return response
  } catch (e) {
    logger?.error({ name: 'updateMythic asset', file: FILE_NAME, ...e }, 'error')
    throw e
  }
}

export async function marketItem({ id, logger }: { id: number; logger?: Logger }) {
  try {
    const endpoint = buildUrl(LANDTORN_API_URL, 'marketplace')
    const response = (await axios.get(`${endpoint}/item/${id}`)).data
    return response
  } catch (e) {
    logger?.error({ name: 'Account infor', file: FILE_NAME, ...e }, 'error')
    return []
  }
}

export async function functionSpoil({
  account,
  logger
}: {
  account: string
  logger?: Logger
}): Promise<FunctionSpoil[]> {
  try {
    const endpoint = buildUrl(LANDTORN_API_URL, 'account')
    const response: FunctionSpoil[] = (await axios.get(`${endpoint}/fspoil/${account}`)).data
    return response
  } catch (e) {
    logger?.error({ name: 'Function spoil infor', file: FILE_NAME, ...e }, 'error')
    return []
  }
}

export async function isValidTx({ hash, logger }: { hash: string; logger?: Logger }) {
  try {
    const endpoint = buildUrl(LANDTORN_API_URL, 'transaction')
    const response: boolean = (await axios.get(`${endpoint}/isValidTx/${hash}`)).data
    return response
  } catch (e) {
    logger?.error({ name: 'is valid tx', file: FILE_NAME, ...e }, 'error')
    return false
  }
}

export async function isValidMarketRequest({
  account,
  marketId,
  logger
}: {
  account: string
  marketId: number
  logger?: Logger
}): Promise<{ id: number; isValid: boolean }[]> {
  try {
    const endpoint = buildUrl(LANDTORN_API_URL, 'marketplace')
    const response = (await axios.get(`${endpoint}/isValidRequest/${account}/${marketId}`)).data
    return response
  } catch (e) {
    logger?.error({ name: 'check valid market request infor', file: FILE_NAME, ...e }, 'error')
    return []
  }
}

export async function createMarketTx({
  txHash,
  account,
  sender,
  marketId,
  amount,
  transactionTime,
  logger
}: {
  txHash: string
  account: string
  sender: string
  marketId: number
  amount: number
  transactionTime: Date
  logger?: Logger
}) {
  try {
    const endpoint = buildUrl(API_URL, 'marketplace')
    const data = {
      txHash,
      account,
      sender,
      marketId,
      transactionTime,
      amount
    }
    const response = await axios.post(`${endpoint}/marketTx`, data)
    return response
  } catch (e) {
    logger?.error({ name: 'marketTx create', file: FILE_NAME, ...e }, 'error')
    throw e
  }
}
