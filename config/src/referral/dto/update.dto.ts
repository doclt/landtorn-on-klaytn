import { ApiProperty } from '@nestjs/swagger'

export class ClanUpdateDto {
  @ApiProperty()
  account: string

  @ApiProperty()
  action: number

  @ApiProperty()
  amount: number

  @ApiProperty()
  txHash: string

  @ApiProperty()
  sender: string
}
