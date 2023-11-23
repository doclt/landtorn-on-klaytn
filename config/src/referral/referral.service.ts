import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../prisma.service'
import { ClanUpdateDto } from './dto/update.dto'
import { parseShard } from '../app.utils'
import { parseEther } from 'ethers'
import { ClanClaimDto } from './dto/claim.dto'

@Injectable()
export class ReferralService {
  constructor(private prismaService: PrismaService) {}

  async update(data: ClanUpdateDto) {
    const { account, action, amount, txHash, sender } = data

    const setting = await this.prismaService.clanSetting.findMany({ where: { actionId: action } })
    const maxLine = [...new Set(setting.map((m) => m.line))]
    let member = await this.prismaService.account.findUnique({ where: { account } })
    await this.prismaService.transaction.create({
      data: { txHash, tornId: member.tokenId, recipient: account, action }
    })
    if (action == 9) {
      //enchantment
      await this.prismaService.enchantment.create({
        data: { txHash, account, value: amount, sender }
      })
    }

    for (let i = 1; i <= maxLine.length; i++) {
      if (!member.joinedClan) return
      //calculate reward for parent
      const parent = await this.prismaService.account.findFirst({
        where: { clan: member.joinedClan }
      })
      const torn = await this.prismaService.torn.findUnique({ where: { id: parent.tokenId } })
      const line = setting.find((f) => f.line == i && f.tornTypeId == torn.typeId)
      if (line) {
        let value: bigint
        if (line.typeId == 1)
          //shard
          value = parseShard(Number(line.value))
        else {
          value = parseEther(line.value.toString())
        }
        const reward = line.unit == 1 ? value : (Number(line.value) * amount) / 100

        if (reward > 0)
          await this.prismaService.clanReward.upsert({
            where: { account_typeId: { account: parent.account, typeId: line.typeId } },
            update: { amount: { increment: reward } },
            create: { account: parent.account, typeId: line.typeId, amount: reward }
          })
        //update activities
        const activityData: Prisma.ClanActivityUncheckedCreateInput = {
          account,
          actionId: action,
          txHash,
          recipient: parent.account,
          line: i,
          rewardTypeId: line.typeId,
          amount: reward
        }
        await this.prismaService.clanActivity.create({ data: activityData })
      }
      member = parent
    }
  }

  async claim(data: ClanClaimDto) {
    const createData: Prisma.ClanClaimUncheckedCreateInput = {
      txHash: data.txHash,
      amount: data.amount,
      recipient: data.recipient,
      rewardTypeId: data.rewardTypeId
    }
    const clan = await this.prismaService.clanClaim.create({ data: createData })

    return clan
  }

  async updateReward(data: ClanClaimDto) {
    await this.prismaService.clanReward.update({
      where: { account_typeId: { account: data.account, typeId: data.rewardTypeId } },
      data: { claimed: { increment: data.amount } }
    })
  }
}
