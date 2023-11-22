import { Test, TestingModule } from '@nestjs/testing'
import { MetadataService } from './metadata.service'
import { PrismaService } from '../prisma.service'
import { AccountService } from '../account/account.service'
import { ReferralService } from '../referral/referral.service'

describe('MetadataService', () => {
  let service: MetadataService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MetadataService, PrismaService, AccountService, ReferralService]
    }).compile()

    service = module.get<MetadataService>(MetadataService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
