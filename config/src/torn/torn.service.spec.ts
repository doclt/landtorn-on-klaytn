import { Test, TestingModule } from '@nestjs/testing'
import { TornService } from './torn.service'
import { PrismaService } from '../prisma.service'

describe('MetadataService', () => {
  let service: TornService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TornService, PrismaService]
    }).compile()

    service = module.get<TornService>(TornService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
