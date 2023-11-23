import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PriceDto } from './dto/insert.dto'

@Injectable()
export class PriceService {
  constructor(private readonly prismaService: PrismaService) {}
  async createMany(data: PriceDto[]) {
    return await this.prismaService.price.createMany({ data })
  }
}
