import { ApiProperty } from '@nestjs/swagger'

export class GameDto {
  @ApiProperty()
  txHash: string

  @ApiProperty()
  gameId: number

  @ApiProperty()
  gameType: number

  @ApiProperty()
  spoilId: number
}
