import { Controller, Get, Param } from '@nestjs/common'
import { DungeonService } from './dungeon.service'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Dungeon')
@Controller({ path: 'dungeon', version: '1' })
export class DungeonController {
  constructor(private dungeonService: DungeonService) {}

  @Get('result/:gameId')
  async dResult(@Param('gameId') gameId: string) {
    return await this.dungeonService.result(Number(gameId))
  }

  @Get('gameResult/:gameId')
  async gameResult(@Param('gameId') gameId: string) {
    return await this.dungeonService.dungeonResult(Number(gameId))
  }

  @Get('distribution/:dungeonType')
  async distribution(@Param('dungeonType') dungeonType: string) {
    return await this.dungeonService.dungeonDistribution(Number(dungeonType))
  }
}
