import { ApiProperty } from '@nestjs/swagger'

export class RandomSpoilDto {
  @ApiProperty()
  catName: string

  @ApiProperty()
  dungeonType: number
}
