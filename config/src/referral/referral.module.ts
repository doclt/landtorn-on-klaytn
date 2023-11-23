import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { ReferralService } from './referral.service'
import { ReferralController } from './referral.controller'

@Module({
  providers: [PrismaService, ReferralService],
  controllers: [ReferralController]
})
export class ReferralModule {}
