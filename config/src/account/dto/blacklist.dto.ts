import { ApiProperty } from '@nestjs/swagger'

export class BlackListDto {
  @ApiProperty()
  account: string

  @ApiProperty()
  txHash: string

  @ApiProperty()
  reason: string
}
