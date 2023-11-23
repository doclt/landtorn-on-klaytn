import { ApiProperty } from '@nestjs/swagger'
import { NFT, Torn } from '../torn.type'

export class NFTDto {
  @ApiProperty()
  tokenId: string
  @ApiProperty()
  tokenType: string
  @ApiProperty()
  txHash: string
  @ApiProperty()
  tokenContract: string
  @ApiProperty()
  owner: string
}

export class TornDto {
  //   @ApiProperty()
  //   totalShard: number

  //   @ApiProperty()
  //   enchanted: number

  //   @ApiProperty()
  //   totalSpoil: number

  //   @ApiProperty()
  //   modifiedTxHash: string
  @ApiProperty()
  nft: NFT

  @ApiProperty()
  torn: Torn
}
