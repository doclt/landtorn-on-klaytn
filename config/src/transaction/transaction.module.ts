import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { TransactionService } from './transaction.service'
import { TransactionController } from './transaction.controller'
import { AccountService } from 'src/account/account.service'

@Module({
  providers: [PrismaService, TransactionService, AccountService],
  controllers: [TransactionController]
})
export class TransactionModule {}
