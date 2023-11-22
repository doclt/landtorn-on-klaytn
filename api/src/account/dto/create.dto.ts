import { ApiProperty } from '@nestjs/swagger'

export class CreateAccountDto {
  @ApiProperty()
  implementation: string

  @ApiProperty()
  account: string

  @ApiProperty()
  chainId: number

  @ApiProperty()
  tokenContract: string

  @ApiProperty()
  tokenId: number

  @ApiProperty()
  salt: number

  @ApiProperty()
  txHash: string

  @ApiProperty()
  joinedClan: string
}
