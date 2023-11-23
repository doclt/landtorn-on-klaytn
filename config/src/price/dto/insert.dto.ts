import { ApiProperty } from '@nestjs/swagger'
export class PriceDto {
  @ApiProperty()
  pricePairId: number

  @ApiProperty()
  value: number
}
