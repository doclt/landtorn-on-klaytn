import { Module } from '@nestjs/common'
import { MarketplaceController } from './marketplace.controller'
import { MarketplaceService } from './marketplace.service'
import { PrismaService } from '../prisma.service'
import { AccountModule } from 'src/account/account.module'

@Module({
  imports: [AccountModule],
  controllers: [MarketplaceController],
  providers: [MarketplaceService, PrismaService]
})
export class MarketplaceModule {}
