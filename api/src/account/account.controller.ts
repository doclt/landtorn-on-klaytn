import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AccountService } from './account.service'
import { CreateAccountDto } from './dto/create.dto'
import { Prisma } from '@prisma/client'

@Controller({ path: 'account', version: '1' })
@ApiTags('Account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get('infor/:settlerId')
  async account(@Param('settlerId') settlerId: string) {
    return await this.accountService.account(Number(settlerId))
  }
  @Get('stat/:settlerId')
  async stat(@Param('settlerId') settlerId: string) {
    return await this.accountService.accountWithoutStatus(Number(settlerId))
  }

  @Get('balance/:wallet/:status')
  async balance(@Param('wallet') wallet: string, @Param('status') status: string) {
    return await this.accountService.balance(wallet, Number(status))
  }

  @Get('spoil/:dtype')
  async spoil(@Param('dtype') dungeonType: string) {
    return await this.accountService.spoilNft(Number(dungeonType))
  }

  @Get('energy/:accountAddress')
  async energy(@Param('accountAddress') accountAddress: string) {
    const energyCount = await this.accountService.energy(accountAddress)
    return { energy: energyCount }
  }

  @Post()
  async insertAccount(@Body() data: CreateAccountDto) {
    const dbData: Prisma.AccountCreateInput = {
      ...data
    }
    return await this.accountService.insert(dbData)
  }

  @Get('sacrifice/:account/:type')
  async sacrificeInfor(@Param('account') account: string, @Param('type') type: number) {
    return await this.accountService.sacrificeReward(account, Number(type))
  }

  @Get('sacrifice/:txHash')
  async rewardReceived(@Param('txHash') txHash: string) {
    return await this.accountService.sacrificeReceived(txHash)
  }

  @Get('torn/:account')
  async torn(@Param('account') account: string) {
    return await this.accountService.tornInfor(account)
  }

  @Get('fSpoil/:account')
  async fSpoil(@Param('account') account: string) {
    return await this.accountService.functionSpoil(account)
  }
}
