import { Controller, Get } from '@nestjs/common'
import { ItemService } from './item.service'
import { ApiTags } from '@nestjs/swagger'

@Controller({ path: 'item', version: '1' })
@ApiTags('Item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}
  @Get('mythic')
  async mythic() {
    return await this.itemService.mythic()
  }

  @Get('campaign')
  async campaign() {
    return await this.itemService.campaign()
  }
}
