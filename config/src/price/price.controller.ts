import { Body, Controller, Post } from '@nestjs/common'
import { PriceService } from './price.service'
import { PriceDto } from './dto/insert.dto'

@Controller({ path: 'price', version: '1' })
export class PriceController {
  constructor(private readonly priceService: PriceService) {}
  @Post()
  async createMany(@Body() data: PriceDto[]) {
    return await this.priceService.createMany(data)
  }
}
