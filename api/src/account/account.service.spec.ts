import { Test, TestingModule } from '@nestjs/testing'
import { AccountService } from './account.service'
import { PrismaService } from '../prisma.service'
import { ReferralService } from '../referral/referral.service'

describe('AccountService', () => {
  let service: AccountService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountService, PrismaService, ReferralService]
    }).compile()

    service = module.get<AccountService>(AccountService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
