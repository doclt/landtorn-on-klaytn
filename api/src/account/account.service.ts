import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../prisma.service'
import { ACCOUNT_IMPLEMENTATION, DUNGEON_VERSION } from '../app.settings'
import { originalAddress, tornDefaultMeta } from './account.utils'
import { getEventRegistry, shardBalance, tornTokenIds } from '../app.utils'
import { SacrificeReward, WalletBalance } from './account.types'

@Injectable()
export class AccountService {
  constructor(private prismaService: PrismaService) {}

  async insert(data: Prisma.AccountCreateInput) {
    const implement = await originalAddress(data.implementation)
    const tokenContract = await originalAddress(data.tokenContract)
    const acc = await originalAddress(data.account)
    //check transaction
    const tx = await getEventRegistry(data.txHash)
    if (tx.account != acc || tx.implementation != implement || tx.tokenContract != tokenContract)
      throw new HttpException('Invalid transaction', HttpStatus.BAD_REQUEST)

    const accountData: Prisma.AccountCreateInput = {
      implementation: implement,
      account: acc,
      chainId: data.chainId,
      tokenContract: tokenContract,
      tokenId: data.tokenId,
      salt: data.salt,
      txHash: data.txHash,
      version: DUNGEON_VERSION,
      joinedClan: data.joinedClan
    }
    if (implement !== ACCOUNT_IMPLEMENTATION)
      throw new HttpException('implementation is not supported', HttpStatus.NOT_FOUND)
    let existedAccount = await this.prismaService.account.findFirst({
      where: {
        OR: [
          {
            tokenId: data.tokenId,
            tokenContract: tokenContract,
            implementation: implement,
            chainId: data.chainId
          },
          { account: acc }
        ]
      }
    })
    if (!existedAccount) {
      existedAccount = await this.prismaService.account.findFirst({
        where: {
          OR: [
            {
              tokenId: data.tokenId,
              tokenContract: tokenContract.toLowerCase(),
              implementation: implement.toLowerCase(),
              chainId: data.chainId
            },
            { account: acc.toLowerCase() }
          ]
        }
      })
    }
    if (existedAccount) {
      throw new HttpException('account existed', HttpStatus.CONFLICT)
    }
    // type 1: settler
    await this.addOrUpdateTorn(accountData.tokenId, 1)
    const newSettler = await this.prismaService.account.create({ data: accountData })

    return newSettler
  }

  async balance(wallet: string, status = 1) {
    const tokenIds: number[] = await tornTokenIds(wallet)
    console.log('token', tokenIds.length)
    if (status == 2) {
      const walletChecked = await originalAddress(wallet)
      const sacrificeTx = await this.prismaService.transaction.findMany({
        where: { recipient: walletChecked, action: 5 }
      })
      tokenIds.push(...sacrificeTx.map((m) => m.tornId))
    }
    if (tokenIds.length <= 0)
      throw new HttpException(`wallet don't have any torn`, HttpStatus.NOT_FOUND)
    let availableTokenIds = await Promise.all(
      tokenIds.map(async (f) => {
        const accActive = await this.prismaService.account.findFirst({
          where: { tokenId: Number(f), version: Number(DUNGEON_VERSION) }
        })
        // if status=2: death, only get account with status=2.
        //else: get account with status = status or account null(token dont have account yet)
        const condition =
          status == 2
            ? accActive != null && accActive?.status == status
            : accActive == null || accActive.status == status
        return condition ? f : undefined
      })
    )
    const walletBalances: WalletBalance[] = []
    availableTokenIds = availableTokenIds.filter((f) => f)
    while (availableTokenIds.length > 0) {
      const balances = await Promise.all(
        availableTokenIds.splice(0, 4).map(async (m) => {
          return await this.balanceByTokenId(Number(m))
        })
      )
      walletBalances.push(...balances)
    }
    return walletBalances
  }

  async balanceByTokenId(tokenId: number) {
    const { description, image } = tornDefaultMeta()
    const balance: WalletBalance = {
      tokenId,
      name: `Settler #${tokenId}`,
      description,
      image,
      account: undefined,
      enchanted: 0,
      shardPower: 0,
      totalSpoil: 0,
      totalMythic: 0,
      atk: 0,
      def: 0
    }
    const account = await this.prismaService.account.findFirst({
      where: { tokenId, version: DUNGEON_VERSION },
      include: { Asset: { include: { Spoil: true } }, AccountMythic: { include: { Mythic: true } } }
    })
    let deathReason = ''
    if (account) {
      const enchainted = await shardBalance(account.account)
      const assets = account.Asset
      const mythics = account.AccountMythic

      const totalSpoil = assets.reduce((p, c) => p + c.Spoil.shard * c.amount, 0)
      const totalMythic = mythics.reduce((p, c) => p + c.amount, 0)

      const totalShard = totalSpoil + enchainted
      const spoilTypeIds = [...new Set(assets.map((f) => f.Spoil.spoilTypeId))]
      let totalAttack = 0
      let totalDefense = 0
      for (let i = 0; i < spoilTypeIds.length; i += 1) {
        const typeId = spoilTypeIds[i]
        const attack = Math.max(
          ...assets.filter((p) => p.Spoil.spoilTypeId === typeId).map((t) => t.Spoil.attack)
        )
        const defense = Math.max(
          ...assets.filter((p) => p.Spoil.spoilTypeId === typeId).map((t) => t.Spoil.defense)
        )
        totalAttack += attack
        totalDefense += defense
      }
      balance.shardPower = totalShard
      balance.totalSpoil = totalSpoil
      balance.enchanted = enchainted
      balance.account = account.account
      balance.atk = totalAttack
      balance.def = totalDefense
      balance.totalMythic = totalMythic
      if (account.status == 2) {
        const blAccount = await this.prismaService.blackList.findFirst({
          where: { account: account.account }
        })
        deathReason = blAccount.reason
      }
    }
    return { ...balance, reason: deathReason || undefined }
  }

  async account(settlerId: number) {
    const account = await this.prismaService.account.findFirst({
      where: { tokenId: settlerId, version: DUNGEON_VERSION, status: 1 },
      include: { Asset: { include: { Spoil: true } }, AccountMythic: { include: { Mythic: true } } }
    })
    //if (!account) throw new HttpException('account is not existed', HttpStatus.NOT_FOUND)
    if (!account) return { account: '', energy: 0, id: 0, balance: undefined }
    const balance = await this.balanceByTokenId(settlerId)
    const mAsset = account.Asset.filter((f) => f.amount > 0).map((m) => {
      return { ...m, Spoil: { ...m.Spoil, balanceOf: m.amount } }
    })
    const mythic = account.AccountMythic.filter((f) => f.amount > 0).map((m) => {
      return { ...m, Spoil: { ...m.Mythic, balanceOf: m.amount } }
    })
    const accEnergy = await this.energy(account.account)

    return { ...account, Asset: mAsset, AccountMythic: mythic, balance: balance, energy: accEnergy }
  }

  async accountWithoutStatus(settlerId: number) {
    const account = await this.prismaService.account.findFirst({
      where: { tokenId: settlerId, version: DUNGEON_VERSION },
      include: { Asset: { include: { Spoil: true } }, AccountMythic: { include: { Mythic: true } } }
    })
    if (!account) return { account: '', energy: 0, id: 0 }
    let balance: WalletBalance
    let mAsset = []
    let mythic = []
    let accEnergy = 0
    if (account.status != 2) {
      balance = await this.balanceByTokenId(settlerId)
      mAsset = account.Asset.filter((f) => f.amount > 0).map((m) => {
        return { ...m, Spoil: { ...m.Spoil, balanceOf: m.amount } }
      })
      mythic = account.AccountMythic.filter((f) => f.amount > 0).map((m) => {
        return { ...m, Spoil: { ...m.Mythic, balanceOf: m.amount } }
      })
      accEnergy = await this.energy(account.account)
    }

    return { ...account, Asset: mAsset, AccountMythic: mythic, balance, energy: accEnergy }
  }

  async spoilNft(dungeonType: number) {
    let spoils: any
    if (dungeonType == 0) {
      spoils = await this.prismaService.spoil.findMany({ orderBy: { id: 'asc' } })
    } else {
      spoils = await this.prismaService.spoil.findMany({
        where: { dungeonTypeId: dungeonType },
        orderBy: { id: 'asc' }
      })
    }

    const mSpoils = spoils.map((m) => {
      return { ...m, balanceOf: 0 }
    })
    return mSpoils
  }

  async energy(account: string) {
    const acc = await this.prismaService.account.findFirst({ where: { account } })
    if (!acc) throw new HttpException('account does not existed', HttpStatus.NOT_FOUND)
    // default enery 40 for 12 hours
    const cycleTime = 12 * 60 * 60 * 1000
    let newEnergy = acc.energy
    let newBeginTime = acc.beginTime
    const curDate = new Date().getTime()
    const con = curDate - newBeginTime.getTime()
    if (con > cycleTime) {
      newEnergy = 40
      newBeginTime = new Date(curDate - (con % cycleTime))
      //update in db
      await this.prismaService.account.update({
        where: { id: acc.id },
        data: {
          energy: newEnergy,
          beginTime: newBeginTime
        }
      })
    }
    return newEnergy + acc.extraEnergy
  }

  async sacrificeReward(account: string, type: number) {
    const acc = await this.prismaService.account.findFirst({
      where: { account, version: Number(DUNGEON_VERSION), status: 1 },
      include: { AccountMythic: true }
    })
    if (!acc) throw new HttpException('account does not existed', HttpStatus.NOT_FOUND)
    //eth price in USD: id: 1
    const ethPrice = await this.prismaService.price.findFirst({
      where: { pricePairId: 1 },
      orderBy: {
        updatedTime: 'desc'
      },
      include: { PricePair: true }
    })
    //shard price in weth: id: 2
    const wethShard = await this.prismaService.price.findFirst({
      where: { pricePairId: 2 },
      orderBy: {
        updatedTime: 'desc'
      },
      include: { PricePair: true }
    })
    const balance = await this.balanceByTokenId(acc.tokenId)
    const shardPrice = 10 ** wethShard.PricePair.decimals / Number(wethShard.value)

    let sacrificeTypes: {
      id: number
      name: string
      feeRatio: number
      rewardRatio: number
    }[]
    if (type == 0) {
      sacrificeTypes = await this.prismaService.sacrificeDefinition.findMany({
        orderBy: { id: 'asc' }
      })
    } else {
      sacrificeTypes = await this.prismaService.sacrificeDefinition.findMany({
        where: { id: type }
      })
    }

    const rewards = await Promise.all(
      sacrificeTypes.map(async (reward) => {
        const shardReward = (balance.shardPower * reward.rewardRatio) / 100
        const mythicReward = acc.AccountMythic
        let Fee = (reward.feeRatio * shardReward * shardPrice) / 100
        // price in weth
        if (reward.id == 1 || reward.id == 4) {
          //feeRatio in this case is in $
          Fee = reward.feeRatio / (Number(ethPrice.value) / 10 ** ethPrice.PricePair.decimals)
        }

        const sReward: SacrificeReward = {
          type: reward.id,
          name: reward.name,
          shard: shardReward,
          mythics: mythicReward,
          fee: Number(Fee.toFixed(18))
        }
        return sReward
      })
    )
    return rewards
  }

  async sacrificeReceived(txHash: string) {
    const tx = await this.prismaService.sacrificeDetail.findMany({
      where: { sacrificeTx: txHash }
    })
    if (tx.length <= 0) throw new HttpException('transaction not found', HttpStatus.NOT_FOUND)
    return tx
  }

  async addOrUpdateTorn(tokenId: number, typeId: number) {
    return await this.prismaService.torn.upsert({
      where: { id: tokenId },
      update: { typeId },
      create: { id: tokenId, typeId }
    })
  }

  async tornInfor(account: string) {
    const acc = await this.prismaService.account.findUnique({ where: { account } })
    return await this.prismaService.torn.findUnique({
      where: { id: acc.tokenId },
      include: { Type: true }
    })
  }

  async functionSpoil(account: string) {
    const functionItems = await this.prismaService.spoil.findMany({ where: { spoilTypeId: 14 } })
    const acc = await this.prismaService.account.findFirst({
      where: { account, version: DUNGEON_VERSION, status: 1 },
      include: { Asset: { where: { spoilId: { in: functionItems.map((m) => m.id) } } } }
    })
    return acc.Asset
  }
}
