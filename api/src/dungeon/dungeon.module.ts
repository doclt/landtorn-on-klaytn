import { Module } from '@nestjs/common'
import { DungeonService } from './dungeon.service'
import { PrismaService } from '../prisma.service'
import { DungeonController } from './dungeon.controller'
import { AccountModule } from '../account/account.module'

@Module({
  imports: [AccountModule],
  providers: [PrismaService, DungeonService],
  controllers: [DungeonController]
})
export class DungeonModule {}
