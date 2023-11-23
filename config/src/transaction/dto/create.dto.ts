import { ApiProperty } from '@nestjs/swagger'

export class TxCreateDto {
  @ApiProperty()
  transactions: Transaction[]

  @ApiProperty()
  recipient: string

  @ApiProperty()
  contract: string

  @ApiProperty()
  gameId: number

  @ApiProperty()
  gameType: number

  @ApiProperty()
  tornId: number

  @ApiProperty()
  rewardList: RewardData[]
}

export class TransactionDto {
  @ApiProperty()
  txHash: string

  @ApiProperty()
  action: number

  @ApiProperty()
  recipient: string

  @ApiProperty()
  tornId?: number

  @ApiProperty()
  note?: string
}

export class SacrificeRewardDto {
  @ApiProperty()
  sacrificeTx: string

  @ApiProperty()
  txHash: string

  @ApiProperty()
  amount: number

  @ApiProperty()
  tokenId: number
}

interface Transaction {
  txHash: string
  action: number
  note?: string
}

interface RewardData {
  id: number
  amount: number
  type: number //0:death, 1: spoil, 2:mythic
}
