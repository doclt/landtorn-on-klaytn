import { Body, Controller, Post } from '@nestjs/common'
import { TornService } from './torn.service'
import { NFTDto } from './dto/create.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Torn')
@Controller({ path: 'Torn', version: '1' })
export class TornController {
  constructor(private metaService: TornService) {}

  @Post()
  async create(@Body() torn: NFTDto) {
    return this.metaService.insert(torn)
  }
}
