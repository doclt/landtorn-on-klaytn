import { ApiProperty } from '@nestjs/swagger'

export class MarketplaceTransactionDto {
  @ApiProperty()
  txHash: string

  @ApiProperty()
  account: string

  @ApiProperty()
  sender: string

  @ApiProperty()
  marketId: number

  @ApiProperty()
  amount: number

  @ApiProperty()
  transactionTime: Date
}
