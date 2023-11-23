import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { AccountService } from './account.service'
import { ApiTags } from '@nestjs/swagger'
import {
  AccountAssetDto,
  AccountMythicDto,
  AccountTornDto,
  AccountUpdateDto
} from './dto/update.dto'
import { BlackListDto } from './dto/blacklist.dto'

@Controller({ path: 'account', version: '1' })
@ApiTags('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get('account/:account')
  async find(@Param('account') account: string) {
    return await this.accountService.findOne(account)
  }

  @Post('energy/:account/:energyAmount')
  async decreaseEnergy(
    @Param('account') account: string,
    @Param('energyAmount') energyAmount: string
  ) {
    const energy = await this.accountService.decreaseEnergy(account, Number(energyAmount))
    return { energy }
  }

  @Post('asset')
  async updateAsset(@Body() data: AccountAssetDto) {
    return await this.accountService.updateAsset(data)
  }

  @Get('blacklist/:account')
  async blackList(@Param('account') account: string) {
    const accBlackList = await this.accountService.blackList(account)
    return accBlackList
  }

  @Get('accountMany')
  async accounts() {
    const accs = await this.accountService.torn()
    return accs
  }

  @Post('blacklist')
  async addBlacklist(@Body() data: BlackListDto) {
    return await this.accountService.addBlackList(data)
  }

  @Post('upgradeTorn')
  async upgradeTorn(@Body() data: AccountTornDto) {
    return await this.accountService.upgradeTorn(data)
  }

  @Post('increaseEnergy')
  async increaseEnergy(@Body() data: AccountUpdateDto) {
    return await this.accountService.increaseEnergy(data)
  }

  @Post('updateMythic')
  async updateMythic(@Body() data: AccountMythicDto) {
    return await this.accountService.updateMythic(data)
  }
}
