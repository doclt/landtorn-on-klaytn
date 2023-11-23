import { Injectable } from '@nestjs/common'
import { MarketplaceTransactionDto } from './dto/create.dto'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../prisma.service'

@Injectable()
export class MarketplaceService {
  constructor(private readonly prismaService: PrismaService) {}
  async createMarketTx(txDto: MarketplaceTransactionDto) {
    const data: Prisma.MarketplaceTransactionUncheckedCreateInput = {
      txHash: txDto.txHash,
      account: txDto.account,
      sender: txDto.sender,
      marketplaceId: txDto.marketId,
      createdTime: txDto.transactionTime,
      amount: txDto.amount
    }
    return await this.prismaService.marketplaceTransaction.create({ data })
  }
}
