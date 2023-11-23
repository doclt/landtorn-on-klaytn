import { ApiProperty } from '@nestjs/swagger'

export class SpoilDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty()
  attack: number

  @ApiProperty()
  defense: number

  @ApiProperty()
  shard: number

  @ApiProperty()
  spoilTypeId: number

  @ApiProperty()
  imageUrl: string

  @ApiProperty()
  dungeonTypeId: number
}

export class SpoilCategoryDto {
  @ApiProperty()
  id?: number
  @ApiProperty()
  name: string
}

export class SpoilTypeDto {
  @ApiProperty()
  id?: number

  @ApiProperty()
  name: string

  @ApiProperty()
  categoryId: number
}
