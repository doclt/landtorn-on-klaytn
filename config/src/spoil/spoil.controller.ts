import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { SpoilService } from './spoil.service'
import { SpoilDto } from './dto/spoil.dto'

@Controller({ path: 'spoil', version: '1' })
export class SpoilController {
  constructor(private spoilService: SpoilService) {}
  @Post()
  async create(@Body() spoilDto: SpoilDto) {
    return await this.spoilService.create(spoilDto)
  }

  @Get(':dType/:catName')
  async spoilRandom(@Param('catName') catName: string, @Param('dType') dungeonTypeId: string) {
    return await this.spoilService.spoilByCat({ catName, dungeonType: Number(dungeonTypeId) })
  }
}
