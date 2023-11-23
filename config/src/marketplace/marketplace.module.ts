import { Module } from '@nestjs/common'
import { MarketplaceService } from './marketplace.service'
import { MarketplaceController } from './marketplace.controller'
import { PrismaService } from '../prisma.service'

@Module({
  providers: [MarketplaceService, PrismaService],
  controllers: [MarketplaceController]
})
export class MarketplaceModule {}
