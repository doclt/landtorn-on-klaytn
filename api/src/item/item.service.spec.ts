import { Test, TestingModule } from '@nestjs/testing'
import { ItemService } from './item.service'
import { PrismaService } from '../prisma.service'

describe('ItemService', () => {
  let service: ItemService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemService, PrismaService]
    }).compile()

    service = module.get<ItemService>(ItemService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
