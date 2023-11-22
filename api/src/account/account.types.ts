export interface WalletBalance {
  tokenId: number
  name: string
  description: string
  image: string
  account: string | undefined
  enchanted: number
  shardPower: number
  totalSpoil: number
  atk: number
  def: number
  totalMythic: number
}

export interface SacrificeReward {
  type: number
  name: string
  shard: number
  mythics: { account: string; mythicId: number; amount: number }[]
  fee: number
}
