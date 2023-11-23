import { Test, TestingModule } from '@nestjs/testing'
import { TransactionService } from './transaction.service'
import { PrismaService } from '../prisma.service'
import { AccountService } from '../account/account.service'

describe('TransactionService', () => {
  let service: TransactionService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionService, PrismaService, AccountService]
    }).compile()

    service = module.get<TransactionService>(TransactionService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
