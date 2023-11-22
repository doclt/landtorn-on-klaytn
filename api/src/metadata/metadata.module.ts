import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { MetadataService } from './metadata.service'
import { MetadataController } from './metadata.controller'
import { AccountModule } from '../account/account.module'

@Module({
  imports: [AccountModule],
  providers: [PrismaService, MetadataService],
  controllers: [MetadataController]
})
export class MetadataModule {}
