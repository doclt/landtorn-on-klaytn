import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { AccountService } from '../account/account.service'
import { PrismaService } from '../prisma.service'
import { randomInt } from 'crypto'
import { rewardD1 } from './dungeon.ultils'
import { mintSpoil } from '../app.utils'
import { DUNGEON_VERSION } from '../app.settings'
import { DungeonResult, Spoil } from './dungeon.types'

@Injectable()
export class DungeonService {
  constructor(private prismaService: PrismaService, private accountService: AccountService) {}

  async dungeon1(tornId: number) {
    const account = await this.accountService.account(tornId)
    if (account.energy <= 0) throw new HttpException('Insufficient energy', HttpStatus.BAD_REQUEST)
    let reward = await rewardD1()
    reward = 'Weapons'
    if (reward == 'Nothing') return { reward: {} }
    const spoils = await this.prismaService.spoil.findMany({
      where: {
        SpoilType: {
          SpoilCategory: { name: reward }
        }
      }
    })
    const randomSpoil = spoils[randomInt(0, spoils.length - 1)]
    const tx = await mintSpoil(account.account, randomSpoil.id)
    if (tx.status == 0) throw new HttpException('tx error', HttpStatus.BAD_REQUEST)
    await this.prismaService.account.update({
      where: { id: account.id },
      data: { energy: { decrement: 1 } }
    })
    return { txHash: tx?.hash || '' }
  }

  async result(gameId: number) {
    const dRs = await this.prismaService.dungeon.findFirst({
      where: { gameId, version: DUNGEON_VERSION },
      include: { DungeonReward: true }
    })
    if (!dRs) throw new HttpException(`GameId [${gameId}] not found`, HttpStatus.NOT_FOUND)
    // response type: 0: nothing, 1:win, 2: dead
    //const results:DungeonResult[]=[]
    const results: DungeonResult[] = await Promise.all(
      dRs.DungeonReward.map(async (reward) => {
        let type: number
        let category: any
        let tokenId: number

        if (reward.spoilId == 0)
          //nothing
          type = 0
        else type = 1
        const spoil = await this.prismaService.spoil.findUnique({ where: { id: reward.spoilId } })
        if (spoil) {
          category = await this.prismaService.spoilType.findFirst({
            where: { id: spoil.spoilTypeId },
            include: { SpoilCategory: true }
          })
        }

        const tx = await this.prismaService.transaction.findFirst({ where: { txHash: dRs.txHash } })
        if (tx)
          tokenId = (
            await this.prismaService.account.findFirst({ where: { account: tx.recipient } })
          )?.tokenId
        return {
          type,
          spoil: {
            ...spoil,
            tokenId,
            category: category?.SpoilCategory || undefined
          },
          rewardType: reward.rewardType,
          amount: reward.amount
        }
      })
    )
    return results[0]
  }

  async dungeonResult(gameId: number) {
    const dRs = await this.prismaService.dungeon.findFirst({
      where: { gameId, version: DUNGEON_VERSION },
      include: { DungeonReward: true }
    })
    if (!dRs) throw new HttpException(`GameId [${gameId}] not found`, HttpStatus.NOT_FOUND)
    // response type: 0: nothing, 1:win, 2: dead
    //const results:DungeonResult[]=[]
    const results: DungeonResult[] = await Promise.all(
      dRs.DungeonReward.map(async (reward) => {
        let type: number
        let category: any
        let tokenId: number
        let rewardToken: Spoil
        if (reward.spoilId == 0)
          //nothing
          type = 0
        else if (reward.spoilId == -1) {
          if (reward.rewardType == 3) type = 3
          else if ((reward.rewardType = 4)) type = 4
          else type = 2
        } //death
        else {
          type = 1 //spoil reward
          if (reward.rewardType == 1) {
            //spoil
            const spoil = await this.prismaService.spoil.findUnique({
              where: { id: reward.spoilId }
            })
            if (spoil) {
              category = await this.prismaService.spoilType.findFirst({
                where: { id: spoil.spoilTypeId },
                include: { SpoilCategory: true }
              })
            }

            rewardToken = {
              ...spoil,
              category: category?.SpoilCategory || undefined
            }
          } else {
            //mythic
            const mythic = await this.prismaService.mythic.findUnique({
              where: { id: reward.spoilId }
            })
            rewardToken = {
              id: mythic.id,
              name: mythic.name,
              attack: 0,
              defense: 0,
              shard: 0,
              spoilTypeId: 0,
              imageUrl: mythic.image,
              dungeonTypeId: 0,
              category: undefined
            }
          }
          const tx = await this.prismaService.transaction.findFirst({
            where: { txHash: dRs.txHash }
          })
          if (tx)
            tokenId = (
              await this.prismaService.account.findFirst({ where: { account: tx.recipient } })
            )?.tokenId
        }

        return {
          type,
          spoil: {
            ...rewardToken,
            tokenId
          },
          rewardType: reward.rewardType,
          amount: reward.amount
        }
      })
    )
    return results
  }

  async dungeonDistribution(typeId: number) {
    const dungeonSetting = await this.prismaService.dungeonType.findFirst({
      where: { id: typeId },
      include: { DungeonSetting: true }
    })
    return dungeonSetting
  }
}
