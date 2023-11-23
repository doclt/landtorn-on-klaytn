import { Module } from '@nestjs/common'
import { SpoilService } from './spoil.service'
import { PrismaService } from '../prisma.service'
import { SpoilController } from './spoil.controller'

@Module({
  providers: [SpoilService, PrismaService],
  controllers: [SpoilController]
})
export class SpoilModule {}
