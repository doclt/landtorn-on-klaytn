import { ApiProperty } from '@nestjs/swagger'

export class AccountUpdateDto {
  @ApiProperty()
  account: string

  @ApiProperty()
  energy: number
}

export class AccountAssetDto {
  @ApiProperty()
  account: string

  @ApiProperty()
  spoilId: number

  @ApiProperty()
  amount: number
}

export class AccountMythicDto {
  @ApiProperty()
  account: string

  @ApiProperty()
  mythicId: number

  @ApiProperty()
  amount: number
}

export class AccountTornDto {
  @ApiProperty()
  account: string

  @ApiProperty()
  tornTypeId: number
}
