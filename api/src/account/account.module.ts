import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { AccountService } from './account.service'
import { AccountController } from './account.controller'

@Module({
  providers: [PrismaService, AccountService],
  controllers: [AccountController],
  exports: [AccountService]
})
export class AccountModule {}
