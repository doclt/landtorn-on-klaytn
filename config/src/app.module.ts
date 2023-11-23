import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigService } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { TornModule } from './torn/torn.module'
import { PrismaService } from './prisma.service'
import { SpoilController } from './spoil/spoil.controller'
import { SpoilService } from './spoil/spoil.service'
import { SpoilModule } from './spoil/spoil.module'
import { TransactionModule } from './transaction/transaction.module'
import { AccountModule } from './account/account.module'
import { PriceModule } from './price/price.module'
import { ReferralController } from './referral/referral.controller'
import { ReferralService } from './referral/referral.service'
import { ReferralModule } from './referral/referral.module'
import { MarketplaceModule } from './marketplace/marketplace.module'

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'data') }),
    TornModule,
    SpoilModule,
    TransactionModule,
    AccountModule,
    PriceModule,
    ReferralModule,
    MarketplaceModule
  ],
  controllers: [AppController, SpoilController, ReferralController],
  providers: [AppService, ConfigService, PrismaService, SpoilService, ReferralService]
})
export class AppModule {}
