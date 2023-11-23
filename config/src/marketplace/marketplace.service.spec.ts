import { Test, TestingModule } from '@nestjs/testing'
import { MarketplaceService } from './marketplace.service'
import { PrismaService } from '../prisma.service'

describe('MarketplaceService', () => {
  let service: MarketplaceService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarketplaceService, PrismaService]
    }).compile()

    service = module.get<MarketplaceService>(MarketplaceService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
