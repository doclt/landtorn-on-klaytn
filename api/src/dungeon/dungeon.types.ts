export interface DungeonResult {
  type: number
  spoil: Spoil
  amount: number
  rewardType: number //1 spoil, 2 mythic
}

export interface Spoil {
  id: number
  name: string
  attack: number
  defense: number
  shard: number
  spoilTypeId: number
  imageUrl: string
  dungeonTypeId: number
  category: { id: number; name: string }
}
