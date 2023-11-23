import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { SacrificeRewardDto, TransactionDto, TxCreateDto } from './dto/create.dto'
import { Prisma } from '@prisma/client'
import { DUNGEON_VERSION } from '../app.settings'
import { AccountService } from '../account/account.service'
import { AccountAssetDto, AccountMythicDto } from '../account/dto/update.dto'

@Injectable()
export class TransactionService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly accountService: AccountService
  ) {}

  async create(data: TxCreateDto) {
    //store dungeon
    const dData: Prisma.DungeonCreateInput = {
      txHash: data?.transactions[0]?.txHash,
      gameId: data.gameId,
      gameType: data.gameType,
      contract: data.contract,
      version: Number(DUNGEON_VERSION)
    }
    const dungeon = await this.prismaService.dungeon.create({ data: dData })
    const txs = data.transactions
    const createTxDatas = txs.map((m) => {
      const txData: Prisma.TransactionCreateManyInput = {
        action: m.action,
        txHash: m.txHash,
        recipient: data.recipient,
        dungeonId: dungeon.id,
        tornId: data.tornId,
        note: m.note
      }
      return txData
    })

    await this.prismaService.transaction.createMany({ data: createTxDatas })
    const rewardDatas: Prisma.DungeonRewardCreateManyInput[] = []
    const spoils = data.rewardList
    if (spoils.length > 0) {
      for (let i = 0; i < spoils.length; i++) {
        const d: Prisma.DungeonRewardCreateManyInput = {
          spoilId: spoils[i].id,
          amount: spoils[i].amount,
          dungeonId: dungeon.id,
          rewardType: spoils[i].type
        }
        rewardDatas.push(d)
      }
    }

    await this.prismaService.dungeonReward.createMany({ data: rewardDatas })
    //update asset
    if (!spoils.find((f) => f.id == -1)) {
      //spoil asset
      await Promise.all(
        spoils
          .filter((f) => f.id != 0 && f.type == 1)
          .map(async (f) => {
            const d: AccountAssetDto = {
              account: data.recipient,
              spoilId: f.id,
              amount: f.amount
            }
            await this.accountService.updateAsset(d)
          })
      )
      //update mythic asset
      await Promise.all(
        spoils
          .filter((f) => f.id != 0 && f.type == 2)
          .map(async (f) => {
            const d: AccountMythicDto = {
              account: data.recipient,
              mythicId: f.id,
              amount: f.amount
            }
            await this.accountService.updateMythic(d)
          })
      )
    }

    return dungeon
  }

  async createTx(data: TransactionDto[]) {
    return await this.prismaService.transaction.createMany({ data })
  }

  async createSacrificeReward(data: SacrificeRewardDto[]) {
    return await this.prismaService.sacrificeDetail.createMany({ data })
  }

  async isValidTx(hash: string): Promise<boolean> {
    const tx = await this.prismaService.transaction.findUnique({ where: { txHash: hash } })
    return tx == null
  }
}
