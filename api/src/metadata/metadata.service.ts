import { Injectable } from '@nestjs/common'
import { Metadata, tornMeta } from './metadata.type'
import { MetadataDto } from './dto/metadata.dto'
import { createProperty } from './metadata.utils'
import { PrismaService } from '../prisma.service'
import { HOST_URL } from '../app.settings'
import { AccountService } from '../account/account.service'

@Injectable()
export class MetadataService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly accountService: AccountService
  ) {}
  async generateMetadata(data: MetadataDto) {
    const metadata: Metadata = {
      name: data.name,
      description: data.description,
      image: data.image,
      properties: {
        shardValue: data.shardValue,
        spoils: createProperty('Spoils', data.spoil, data.spoil),
        enchainted: createProperty('Enchanted', data.enchanted, data.enchanted),
        shard: createProperty('Spoils', data.shardValue, data.shardValue)
      }
    }
    return metadata
  }

  async mythicMeta(id: number) {
    const mythic = await this.prismaService.mythic.findUnique({
      where: { id },
      include: { Rarity: true, Allegiance: true }
    })
    const meta = {
      description: mythic.description,
      image: `${HOST_URL}/mythic/images/${id}.png`,
      name: mythic.name,
      properties: {
        rarity: {
          name: 'Rarity',
          value: mythic.Rarity.name,
          display_value: mythic.Rarity.name
        },
        allegiance: {
          name: 'Allegiance',
          value: mythic.Allegiance.name,
          display_value: mythic.Allegiance.name
        }
      }
    }
    return meta
  }

  async spoilMeta(id: number) {
    const spoil = await this.prismaService.spoil.findUnique({ where: { id } })
    const meta = {
      description: '',
      image: `${HOST_URL}/spoil/images/${id}.png`,
      name: spoil.name,
      properties: {}
    }
    return meta
  }

  async settlerMeta(id: number) {
    const data: tornMeta = {
      id,
      name: '',
      status: 1,
      shardPower: 0,
      ritualStone: '',
      totalMythic: 0,
      description: '',
      image: '',
      type: ''
    }

    const settler = await this.prismaService.torn.findUnique({
      where: { id },
      include: { Type: true }
    })

    if (settler) {
      const acc: any = await this.accountService.account(id)
      data.name = `${settler.Type.name}#${id}`
      data.type = settler.Type.name
      data.description = settler.Type.description
      data.image = settler.status == 1 ? settler.Type.image : 'settlerDead.png'
      data.status = settler.status
      data.shardPower = acc.balance?.shardPower ?? 0
      data.ritualStone = acc.Asset?.find((f: any) => f.Spoil.id == 70) ? 'Yes' : 'No'
      data.totalMythic = acc.balance?.totalMythic ?? 0
    } else {
      const tornSettler = await this.prismaService.tornType.findFirst({
        where: { name: 'Settler' }
      })
      data.name = `${tornSettler.name}#${id}`

      data.description = tornSettler.description
      data.image = tornSettler.image
      data.type = tornSettler.name
    }
    const meta = {
      description: data.description,
      image: `https://api.landtorn.com/torn/images/${data.image}`,
      name: data.name,
      properties: {
        type: {
          name: 'Type',
          value: data.type,
          display_value: data.type
        },
        status: {
          name: 'Status',
          value: data.status == 1 ? 'Alive' : 'Dead',
          display_value: data.status == 1 ? 'Alive' : 'Dead'
        },
        shardObject: {
          name: 'Shard Power',
          value: data.shardPower,
          display_value: data.shardPower
        },
        ritualStone: {
          name: 'Ritual stone',
          value: data.ritualStone,
          display_value: data.ritualStone
        },
        mythic: {
          name: 'Mythic',
          value: data.totalMythic,
          display_value: data.totalMythic
        }
      }
    }

    return meta
  }
}
