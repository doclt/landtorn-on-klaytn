import { Contract, TransactionRequest, Wallet, ethers, parseEther } from 'ethers'
import {
  MYTHIC_ADDRESS,
  PROVIDER_URL,
  REFERRAL_OPERATOR_PRIV,
  SHARD_ADDRESS,
  SPOIL_ADDRESS,
  SPOIL_CLAIMER_ADDRESS,
  SPOIL_MINTER_PRIV,
  TORN_ADDRESS
} from '../settings'
import { SpoilClaimerAbis } from '../contracts/spoilClaimer'
import { randomInt } from 'crypto'
import { Erc20Abis } from '../contracts/erc20'
import { SpoilAbis } from '../contracts/spoil'
import { MythicAbis } from '../contracts/mythic'
import { dungeonDistribution } from '../apis'
import { IDungeonSetting } from '../types'
import { Reward } from './types'
import { TornAbis } from '../contracts/torn'
import { parseShard } from '../utils'

const gasLimit = 500000

export async function buildContract(
  abis: ethers.InterfaceAbi,
  address: string,
  minterWallet: string = SPOIL_MINTER_PRIV
) {
  const provider = new ethers.JsonRpcProvider(PROVIDER_URL)
  const wallet = new ethers.Wallet(minterWallet, provider)
  return new Contract(address, abis, wallet)
}

export async function getTransaction(txHash: string) {
  const provider = new ethers.JsonRpcProvider(PROVIDER_URL)
  return await provider.getTransaction(txHash)
}

export async function fulfill(accountAddress: string, spoilType: number, isDead: boolean) {
  const spoil = await buildContract(SpoilClaimerAbis, SPOIL_CLAIMER_ADDRESS)
  const receipt = await spoil.fulfill(accountAddress, spoilType, 1, isDead, '0x')
  return await receipt.wait()
}

export async function spoilMint(accountAddress: string, spoilType: number) {
  const spoil = await buildContract(SpoilAbis, SPOIL_ADDRESS)
  const receipt = await spoil.mint(accountAddress, spoilType, 1, '0x')
  return await receipt.wait()
}

export async function spoilMintBatch(
  accountAddress: string,
  spoilTypes: number[],
  amounts: number[]
) {
  const spoil = await buildContract(SpoilAbis, SPOIL_ADDRESS)
  const receipt = await spoil.mintBatch(accountAddress, spoilTypes, amounts, '0x', {
    gasLimit
  })
  return await receipt.wait()
}

export async function shardBalance(address: string): Promise<bigint> {
  const shard = await buildContract(Erc20Abis, SHARD_ADDRESS)
  const receipt: bigint = await shard.balanceOf(address)
  return receipt
}

export async function mythicMintBatch(
  accountAddress: string,
  mythicTypes: number[],
  amounts: number[],
  signer: string = SPOIL_MINTER_PRIV
) {
  const mythic = await buildContract(MythicAbis, MYTHIC_ADDRESS, signer)
  const receipt = await mythic.mintBatch(accountAddress, mythicTypes, amounts, '0x', {
    gasLimit
  })
  return await receipt.wait()
}

export async function shardTransfer(
  to: string,
  amount: number,
  signer: string = SPOIL_MINTER_PRIV
) {
  const shardContract = await buildContract(Erc20Abis, SHARD_ADDRESS, signer)
  const tx = await shardContract.transfer(to, parseShard(amount), {
    gasLimit
  })
  return await tx.wait()
}

export async function ethTransfer(
  to: string,
  amount: number,
  signer: string = REFERRAL_OPERATOR_PRIV
) {
  const provider = new ethers.JsonRpcProvider(PROVIDER_URL)
  const sender = new Wallet(signer, provider)
  const value = parseEther(amount.toString())
  const tx: TransactionRequest = {
    gasLimit,
    value,
    from: sender.address,
    to
  }
  const txRespone = await sender.sendTransaction(tx)
  return await txRespone.wait()
}

export async function tornOwnerOf(tokenId: number) {
  const tornContract = await buildContract(TornAbis, TORN_ADDRESS)
  const owner = await tornContract.ownerOf(tokenId)
  return owner
}

export async function rewardDungeon(
  rewards: IDungeonSetting[],
  statRatio: number = 1,
  enchantment: number = 0
): Promise<Reward | undefined> {
  const maxNumber = 100000
  const numberRatio = statRatio * maxNumber

  const rd = randomInt(1, maxNumber)
  let maxBaseRatio = 100 //100%
  let enchantmentSetting: IDungeonSetting[] = []
  const haveDead = rewards.find((f) => f.rewardName == 'Dead')
  if (haveDead) {
    const ranges = [
      ...new Set(
        rewards
          .filter((f) => f.range != null)
          .map((m) => m.range)
          .sort((a, b) => b - a)
      )
    ]
    for (let i = 0; i < ranges.length; i++) {
      const maxEnchantment = ranges[i]
      if (enchantment >= maxEnchantment) {
        enchantmentSetting = rewards.filter((f) => f.range == maxEnchantment)
        break
      }
    }
    //get total dead and ritual stone ratio
    const totalDeadAndRitualRatio = enchantmentSetting
      .map((m) => m.ratio)
      .reduce((p, v) => Number(p) + Number(v), 0)
    maxBaseRatio = maxBaseRatio - totalDeadAndRitualRatio
  }
  const baseRewards = rewards.filter((f) => f.range == null)
  baseRewards.push(...enchantmentSetting)
  let minNumber: number = 0
  for (let i = 0; i < baseRewards.length; i++) {
    const reward = baseRewards[i]
    if (reward.rewardName != 'Dead') {
      const rewardRatio = Number(((reward.ratio / 100) * (maxBaseRatio / 100)).toFixed(5))
      const maxNumber = Math.floor(rewardRatio * numberRatio) + minNumber
      if (rd >= minNumber && rd <= maxNumber) {
        return { rewardName: reward.rewardName, rewardType: reward.rewardType }
      }
      minNumber = maxNumber
    }
  }

  // if no return, it mean dead situation
  return { rewardName: 'Dead', rewardType: 0 }
}

// condition for dungeon
export function gate(dungeonType: number): number {
  let shardAmount = 0
  switch (dungeonType) {
    case 1:
      shardAmount = 0
      break
    case 2:
      shardAmount = 15
      break
    default:
      break
  }
  return shardAmount
}

export function surviveStat(dungeonType: number): { atk: number; def: number } {
  const surviveStat: { atk: number; def: number } = {
    atk: 0,
    def: 0
  }
  switch (dungeonType) {
    case 1:
      surviveStat.atk = 0
      surviveStat.def = 0
      break
    case 2:
      surviveStat.atk = 7
      surviveStat.def = 7
      break
    case 3:
      surviveStat.atk = 20
      surviveStat.def = 20
      break
    case 4:
      surviveStat.atk = 50
      surviveStat.def = 50
      break
    default:
      break
  }
  return surviveStat
}

export async function dungeonSetting(dungeonType: number) {
  return await dungeonDistribution({ type: dungeonType })
}

export async function spoilBalanceOf(accountAddress: string, spoilType: number) {
  const spoil = await buildContract(SpoilAbis, SPOIL_ADDRESS)
  const balance = await spoil.balanceOf(accountAddress, spoilType)
  return balance
}
