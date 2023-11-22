import { Test, TestingModule } from '@nestjs/testing'
import { MarketplaceService } from './marketplace.service'
import { PrismaService } from '../prisma.service'
import { AccountService } from '../account/account.service'

describe('MarketplaceService', () => {
  let service: MarketplaceService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarketplaceService, PrismaService, AccountService]
    }).compile()

    service = module.get<MarketplaceService>(MarketplaceService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
