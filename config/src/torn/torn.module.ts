import { Module } from '@nestjs/common'
import { TornService } from './torn.service'
import { PrismaService } from 'src/prisma.service'
import { TornController } from './torn.controller'

@Module({
  providers: [TornService, PrismaService],
  controllers: [TornController]
})
export class TornModule {}
