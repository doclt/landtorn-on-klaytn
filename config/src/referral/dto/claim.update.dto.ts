import { ApiProperty } from '@nestjs/swagger'

export class ClanClaimDto {
  @ApiProperty()
  recipient: string

  @ApiProperty()
  amount: number

  @ApiProperty()
  txHash: string

  @ApiProperty()
  rewardTypeId: number

  @ApiProperty()
  account: string
}
