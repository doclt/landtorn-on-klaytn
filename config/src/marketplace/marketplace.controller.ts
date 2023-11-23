import { Body, Controller, Post } from '@nestjs/common'
import { MarketplaceTransactionDto } from './dto/create.dto'
import { MarketplaceService } from './marketplace.service'
import { ApiTags } from '@nestjs/swagger'

@Controller({ path: 'marketplace', version: '1' })
@ApiTags('marketplace')
export class MarketplaceController {
  constructor(private readonly marketService: MarketplaceService) {}
  @Post('marketTx')
  async createMarketTx(@Body() data: MarketplaceTransactionDto) {
    return await this.marketService.createMarketTx(data)
  }
}
