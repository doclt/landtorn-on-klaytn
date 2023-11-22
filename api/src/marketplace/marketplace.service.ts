import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { AccountService } from '../account/account.service'

@Injectable()
export class MarketplaceService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly accountService: AccountService
  ) {}
  async findOne(id: number) {
    return await this.prismaService.marketplaceItem.findUnique({ where: { id } })
  }

  async findMany() {
    return await this.prismaService.marketplaceItem.findMany({
      where: { id: { not: 1 } },
      orderBy: { id: 'desc' }
    })
  }

  async baronSet() {
    return await this.prismaService.marketplaceBaronSet.findMany({})
  }

  async buyResult(hash: string) {
    const tx = await this.prismaService.transaction.findUnique({
      where: { txHash: hash }
    })
    const marketSpoil = await this.prismaService.asset.findMany({
      where: { account: tx.recipient, spoilId: { in: [275, 276] } },
      include: { Spoil: true }
    })
    const mAsset = marketSpoil.map((m) => {
      return { ...m, Spoil: { ...m.Spoil, balanceOf: m.amount } }
    })
    const energy = await this.accountService.energy(tx.recipient)
    return { spoil: mAsset, energy }
  }

  async isValidRequest(account: string, itemTypeId: number) {
    const items = await this.prismaService.marketplaceItem.findMany({
      where: { itemType: itemTypeId }
    })
    const now = new Date().getTime()
    // 24h
    const cycleTime = 24 * 60 * 60 * 1000
    const tdate = new Date(now - cycleTime)
    const result: { id: number; isValid: boolean }[] = []
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      const marketTxs = await this.prismaService.marketplaceTransaction.findMany({
        where: {
          account,
          MarketplaceItem: { id: item.id },
          createdTime: { gte: tdate }
        },
        orderBy: { createdTime: 'desc' },
        take: 3
      })
      result.push({ id: item.id, isValid: marketTxs.length < 3 })
    }

    return result
  }
}
