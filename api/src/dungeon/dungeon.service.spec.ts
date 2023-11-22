import { Test, TestingModule } from '@nestjs/testing'
import { DungeonService } from './dungeon.service'
import { PrismaService } from '../prisma.service'
import { AccountService } from '../account/account.service'

describe('DungeonService', () => {
  let service: DungeonService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DungeonService, PrismaService, AccountService]
    }).compile()

    service = module.get<DungeonService>(DungeonService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
