import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../prisma.service'
import { SpoilDto, SpoilTypeDto } from './dto/spoil.dto'
import { randomInt } from 'crypto'
import { RandomSpoilDto } from './dto/random.dto'

@Injectable()
export class SpoilService {
  constructor(private prismaService: PrismaService) {}

  async create(data: SpoilDto) {
    const type = await this.prismaService.spoilType.findUnique({ where: { id: data.spoilTypeId } })
    if (!type) throw new HttpException('Type is not existed', HttpStatus.NOT_FOUND)
    return await this.prismaService.spoil.create({ data })
  }

  async update(params: { where: Prisma.SpoilWhereUniqueInput; data: SpoilDto }) {
    const { where, data } = params
    return await this.prismaService.spoil.update({ where, data })
  }

  async remove(id: number) {
    return await this.prismaService.spoil.delete({ where: { id } })
  }

  async createSpoilType(data: Prisma.SpoilTypeCreateInput) {
    return await this.prismaService.spoilType.create({ data })
  }

  async updateSpoilType(params: { where: Prisma.SpoilTypeWhereUniqueInput; data: SpoilTypeDto }) {
    const { where, data } = params
    return await this.prismaService.spoilType.update({ data, where })
  }

  async removeSpoilType(id: number) {
    const spoilType = await this.prismaService.spoilType.findUnique({
      where: { id },
      include: { Spoil: true }
    })
    if (spoilType.Spoil)
      throw new HttpException('Have children in this type', HttpStatus.BAD_REQUEST)
    return await this.prismaService.spoilType.delete({ where: { id } })
  }

  async createSpoilCategory(data: Prisma.SpoilCategoryCreateInput) {
    return await this.prismaService.spoilCategory.create({ data })
  }

  async updateSpoilCategory(params: {
    where: Prisma.SpoilCategoryWhereUniqueInput
    data: Prisma.SpoilCategoryUpdateInput
  }) {
    const { where, data } = params
    return await this.prismaService.spoilCategory.update({ data, where })
  }

  async removeSpoilCategory(id: number) {
    const cate = await this.prismaService.spoilCategory.findUnique({
      where: { id },
      include: { SpoilType: true }
    })
    if (cate.SpoilType)
      throw new HttpException('Have children in this type', HttpStatus.BAD_REQUEST)
    return await this.prismaService.spoilCategory.delete({ where: { id } })
  }

  async spoilByCat(reward: RandomSpoilDto) {
    if (reward.catName == 'Nothing') return { reward: {} }
    const spoilsCat = await this.prismaService.spoil.findMany({
      where: {
        SpoilType: {
          Category: {
            name: reward.catName
          }
        }
      }
    })
    const spoils = spoilsCat.filter((f) => f.dungeonTypeId == reward.dungeonType)
    const randomSpoil = spoils[randomInt(0, spoils.length - 1)]
    return randomSpoil
  }
}
