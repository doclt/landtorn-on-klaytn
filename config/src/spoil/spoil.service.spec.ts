import { Test, TestingModule } from '@nestjs/testing'
import { SpoilService } from './spoil.service'
import { PrismaService } from '../prisma.service'

describe('SpoilService', () => {
  let service: SpoilService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpoilService, PrismaService]
    }).compile()

    service = module.get<SpoilService>(SpoilService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
