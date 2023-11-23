export interface Property {
  name: string
  value: string
  display_value: string
}

export interface TornTrait {
  shardValue: number
}

export interface Spoil {
  type: string
  helmet: string
  chest: string
  arms: string
  background: string
  eyes: string
  headgear: string
  faceEmblem: string
  chestEmblem: string
  special: boolean
  weapon: string
  pet: string
}

export interface NFT {
  tokenId: string
  name: string
  description: string
  image: string
  createdTxHash: string
  tokenContract: string
}

export interface Torn {
  totalShard: number
  enchanted: number
  totalSpoil: number
  modifiedTxHash: string
}

export interface TornMetadata {
  name: string
  description: string
  image: string
  type: string //1: Torn, 2: Paladin, 3: IronFist
  shardValue: number
  enchanted: number
  spoil: number
}
