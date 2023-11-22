import { Controller, Get, Param } from '@nestjs/common'
import { MarketplaceService } from './marketplace.service'
import { ApiTags } from '@nestjs/swagger'

@Controller({ path: 'marketplace', version: '1' })
@ApiTags('Marketplace')
export class MarketplaceController {
  constructor(private readonly marketService: MarketplaceService) {}
  @Get('item/:id')
  async item(@Param('id') id: string) {
    return await this.marketService.findOne(Number(id))
  }

  @Get('baronSet')
  async baronSet() {
    return await this.marketService.baronSet()
  }
  @Get('item')
  async allItems() {
    return await this.marketService.findMany()
  }

  @Get('buyResult/:hash')
  async buy(@Param('hash') hash: string) {
    return await this.marketService.buyResult(hash)
  }

  @Get('isValidRequest/:account/:itemTypeId')
  async isValidRequest(@Param('account') account: string, @Param('itemTypeId') itemTypeId: string) {
    return await this.marketService.isValidRequest(account, Number(itemTypeId))
  }
}
