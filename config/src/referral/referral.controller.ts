import { Body, Controller, Post } from '@nestjs/common'
import { ReferralService } from './referral.service'
import { ClanUpdateDto } from './dto/update.dto'
import { ClanClaimDto } from './dto/claim.dto'

@Controller({ path: 'referral', version: '1' })
export class ReferralController {
  constructor(private readonly referralService: ReferralService) {}
  @Post()
  async update(@Body() data: ClanUpdateDto) {
    return await this.referralService.update(data)
  }

  @Post('claim')
  async claim(@Body() data: ClanClaimDto) {
    await this.referralService.claim(data)
  }

  @Post('updateReward')
  async updateReward(@Body() data: ClanClaimDto) {
    await this.referralService.updateReward(data)
  }
}
