export interface IDungeon {
  id: number;
  name: string;
  gate: null | number;
  atk: null | number;
  def: null | number;
  energy: null | number;
  DungeonSetting: IDungeonSetting[];
}

export interface IDungeonSetting {
  id: number;
  dungeonTypeId: number;
  range: null | number;
  rewardName: string;
  ratio: string;
  rewardType: number | null;
}

export interface IDistribution {
  distribution: { rewardName: string; ratio: string }[];
  enchant: {
    enchanted: number | null;
    ritualStone?: string;
    death?: string;
  }[];
}
