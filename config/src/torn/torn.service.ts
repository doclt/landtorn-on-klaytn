import { Injectable } from '@nestjs/common'
import { Metadata } from '../app.types'
import { createProperty } from './torn.utils'
import { PrismaService } from '../prisma.service'
import { NFTDto } from './dto/create.dto'
import { TornMetadata } from './torn.type'

@Injectable()
export class TornService {
  constructor(private readonly prismaService: PrismaService) {}

  async generateMetadata(data: TornMetadata) {
    const metadata: Metadata = {
      name: data.name,
      description: data.description,
      image: data.image,
      properties: {
        shardValue: data.shardValue,
        spoils: createProperty('Spoil', data.spoil, data.spoil),
        enchainted: createProperty('Enchanted', data.enchanted, data.enchanted),
        shard: createProperty('Shard', data.shardValue, data.shardValue),
        type: createProperty('Type', data.type, data.type)
      }
    }
    return metadata
  }
  /* eslint-disable @typescript-eslint/no-unused-vars */
  async insert(tornDto: NFTDto) {
    //   tokenId: Number(nft.tokenId),
    //   tokenType: tokenTypeId,
    //   name: '',
    //   description: '',
    //   image: `${tokenId}.png`,
    //   createdTxHash: nft.txHash,
    //   tokenContract: nft.tokenContract
    // }
    // const data: Prisma.TornCreateInput = {
    //   BaseInfo: {
    //     // create: nftData
    //   },
    //   totalShard: shard,
    //   enchanted: 0,
    //   totalSpoil: 0,
    //   modifiedTxHash: ''
    // }
    // const tornCreated = await this.prismaService.torn.create({ data })
    // const metaData: TornMetadata = {
    //   name: '',
    //   description: '',
    //   image,
    //   shardValue: shard,
    //   enchanted: 0,
    //   spoil: 0,
    //   type: tokenTypeName(Number(nft.tokenType))
    // }
    // const jsonData = this.generateMetadata(metaData)
    // await writeFile(join(jsonDir, `${tokenId}.json`), JSON.stringify(jsonData))
    // return tornCreated
  }
}
