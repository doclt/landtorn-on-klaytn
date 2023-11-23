import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { SacrificeRewardDto, TransactionDto, TxCreateDto } from './dto/create.dto'
import { TransactionService } from './transaction.service'

@Controller({ path: 'transaction', version: '1' })
export class TransactionController {
  constructor(private readonly txService: TransactionService) {}
  @Post()
  async create(@Body() data: TxCreateDto) {
    return await this.txService.create(data)
  }

  @Post('tx')
  async createTx(@Body() data: TransactionDto[]) {
    return await this.txService.createTx(data)
  }

  @Post('sacrificeReward')
  async sacrificeReward(@Body() data: SacrificeRewardDto[]) {
    return await this.txService.createSacrificeReward(data)
  }

  @Get('isValidTx/:hash')
  async isValidTx(@Param('hash') hash: string) {
    return await this.txService.isValidTx(hash)
  }
}
