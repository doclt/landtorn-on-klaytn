import { ApiProperty } from '@nestjs/swagger'

export class MetadataDto {
  @ApiProperty()
  name: string

  @ApiProperty()
  description: string

  @ApiProperty()
  image: string

  @ApiProperty()
  shardValue: number

  @ApiProperty()
  enchanted: number

  @ApiProperty()
  spoil: number
}
