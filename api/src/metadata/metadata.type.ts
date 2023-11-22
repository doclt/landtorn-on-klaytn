export interface Metadata {
  name: string
  description: string
  image: string
  properties: any
}

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

export interface tornMeta {
  id: number
  name: string
  description: string
  type: string
  image: string
  status: number
  shardPower: number
  ritualStone: string
  totalMythic: number
}
