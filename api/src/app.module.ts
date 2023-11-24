import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigService } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { AccountModule } from './account/account.module'
import { MarketplaceModule } from './marketplace/marketplace.module'
import { MetadataModule } from './metadata/metadata.module'
import { ItemModule } from './item/item.module'
import { DungeonModule } from './dungeon/dungeon.module'
@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'data') }),
    AccountModule,
    MarketplaceModule,
    MetadataModule,
    ItemModule,
    DungeonModule
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService]
})
export class AppModule {}
