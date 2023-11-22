import { Controller, Get, Param } from '@nestjs/common'
import { MetadataService } from './metadata.service'
import { ApiTags } from '@nestjs/swagger'

@Controller({ path: 'metadata' })
@ApiTags('Metadata')
export class MetadataController {
  constructor(private metaService: MetadataService) {}

  @Get(':id')
  async getMeta(@Param('id') id: string) {
    return await this.metaService.settlerMeta(Number(id))
  }

  @Get('mythic/:id')
  async mythicMeta(@Param('id') id: string) {
    return await this.metaService.mythicMeta(Number(id))
  }

  @Get('spoil/:id')
  async spoilMeta(@Param('id') id: string) {
    return await this.metaService.spoilMeta(Number(id))
  }
}
