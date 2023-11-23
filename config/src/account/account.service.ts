import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import {
  AccountAssetDto,
  AccountMythicDto,
  AccountTornDto,
  AccountUpdateDto
} from './dto/update.dto'
import { DUNGEON_VERSION } from '../app.settings'
import { BlackListDto } from './dto/blacklist.dto'

@Injectable()
export class AccountService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(account: string) {
    const acc = await this.prismaService.account.findFirst({
      where: { account, version: Number(DUNGEON_VERSION), status: 1 },
      include: { Asset: { include: { Spoil: true } } }
    })
    let atk = 0
    let def = 0
    const assets = acc?.Asset || []
    const spoilTypeIds = [...new Set(assets.map((f) => f.Spoil.spoilTypeId))]
    let totalAttack = 0
    let totalDefense = 0
    for (let i = 0; i < spoilTypeIds.length; i += 1) {
      const typeId = spoilTypeIds[i]
      const attack = Math.max(
        ...assets.filter((p) => p.Spoil.spoilTypeId === typeId).map((t) => t.Spoil.attack)
      )
      const defense = Math.max(
        ...assets.filter((p) => p.Spoil.spoilTypeId === typeId).map((t) => t.Spoil.defense)
      )
      totalAttack += attack
      totalDefense += defense
    }
    atk = totalAttack
    def = totalDefense
    return { ...acc, atk, def }
  }

  async energy(account: string) {
    let acc = await this.prismaService.account.findFirst({
      where: { account, version: Number(DUNGEON_VERSION), status: 1 }
    })

    if (!acc) {
      const lowerAccount = account.toLowerCase()
      acc = await this.prismaService.account.findFirst({
        where: { account: lowerAccount, version: Number(DUNGEON_VERSION), status: 1 }
      })
      throw new HttpException('account does not existed', HttpStatus.NOT_FOUND)
    }
    // default enery 20 for 12 hours
    const cycleTime = 12 * 60 * 60 * 1000
    let newEnergy = acc.energy
    let NewBeginTime = acc.beginTime
    const curDate = new Date().getTime()
    const con = curDate - NewBeginTime.getTime()
    if (con > cycleTime) {
      newEnergy = 40
      NewBeginTime = new Date(curDate - (con % cycleTime))
      //update in db
      await this.prismaService.account.update({
        where: { id: acc.id },
        data: {
          energy: newEnergy,
          beginTime: NewBeginTime
        }
      })
    }

    return newEnergy
  }

  async decreaseEnergy(account: string, energy: number) {
    const acc = await this.prismaService.account.findFirst({
      where: { account, version: Number(DUNGEON_VERSION) }
    })
    const baseEnergy = Math.min(acc.energy, energy)
    const extraEnergy = acc.energy < energy ? energy - acc.energy : 0
    const updateBaseEnergy = await this.prismaService.account.update({
      where: { id: acc.id },
      data: {
        energy: { decrement: baseEnergy }
      }
    })

    await this.prismaService.account.update({
      where: { id: acc.id },
      data: {
        extraEnergy: { decrement: extraEnergy }
      }
    })

    return updateBaseEnergy
  }

  async updateAsset(data: AccountAssetDto) {
    return await this.prismaService.asset.upsert({
      where: {
        account_spoilId: {
          account: data.account,
          spoilId: data.spoilId
        }
      },
      update: { amount: { increment: data.amount } },
      create: { ...data }
    })
  }

  async updateMythic(data: AccountMythicDto) {
    return await this.prismaService.accountMythic.upsert({
      where: {
        account_mythicId: {
          account: data.account,
          mythicId: data.mythicId
        }
      },
      update: { amount: { increment: data.amount } },
      create: { ...data }
    })
  }

  async addBlackList(data: BlackListDto) {
    //update account status
    const acc = await this.prismaService.account.update({
      where: { account: data.account },
      data: { status: 2 }
    }) //dead
    // black list data
    await this.prismaService.blackList.create({ data })
    await this.prismaService.torn.update({ where: { id: acc.tokenId }, data: { status: 0 } })
  }

  async blackList(account: string) {
    //update account status
    // const acc = await this.prismaService.account.findUnique({
    //   where: { account, version: Number(DUNGEON_VERSION), status: 2 }
    // }) //dead
    const acc = await this.prismaService.blackList.findUnique({ where: { account } })
    let recipient = undefined
    if (acc) {
      const tx = await this.prismaService.transaction.findUnique({ where: { txHash: acc.txHash } })
      recipient = tx.recipient
    }
    return acc ? { ...acc, recipient } : undefined
  }

  async accounts() {
    return await this.prismaService.account.findMany({ where: { version: 2 } })
  }

  async torn() {
    return await this.prismaService.torn.findMany({ orderBy: { id: 'asc' } })
  }

  async upgradeTorn(data: AccountTornDto) {
    const account = await this.prismaService.account.findUnique({
      where: { account: data.account, status: 1 }
    })

    return await this.prismaService.torn.update({
      where: { id: account.tokenId },
      data: { typeId: data.tornTypeId }
    })
  }

  async increaseEnergy(data: AccountUpdateDto) {
    return await this.prismaService.account.update({
      where: { account: data.account },
      data: { extraEnergy: { increment: data.energy } }
    })
  }
}
