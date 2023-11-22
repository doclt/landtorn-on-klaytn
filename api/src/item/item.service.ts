import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'

@Injectable()
export class ItemService {
  constructor(private readonly prismaService: PrismaService) {}

  async mythic() {
    return await this.prismaService.mythic.findMany({ include: { Allegiance: true, Rarity: true } })
  }

  async campaign() {
    return await this.prismaService.campaign.findMany({ include: { Spoil: true } })
  }
}
