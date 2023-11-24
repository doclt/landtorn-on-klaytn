export interface IDropdownItem {
  lable: string;
  value: string | number;
}

export enum CHAIN_ID {
  TESTNET = 97,
  MAINNET = 56,
}

export enum ErrorType {
  NOT_SIGNED,
  NOT_ENOUGH_ENERGY,
  NOT_ENOUGH_ETH,
  OH_NO,
  NOT_ENOUGH_SHARD
}

export interface ILatestRound {
  answer: number;
  answeredInRound: number;
  roundId: number;
  startedAt: number;
  updatedAt: number;
}

export interface LandTornNFT {
  tokenId: number;
  name: string;
  description: string;
  image: string;
  account?: string;
  enchanted: number;
  shardPower: number;
  totalSpoil: number;
  atk: number;
  def: number;
  totalMythic: number;
  reason?: string;
}

export interface ISpoil {
  id: number;
  tokenId: number;
  name: string;
  attack: number;
  defense: number;
  shard: number;
  spoilTypeId?: number;
  balanceOf: number;
  dungeonTypeId: DungeonType;
  rewardType?: RewardType;
  isClaim?: boolean;
  amount: number;
  sortVal: number;
  allegianceId?: number;
  isActive?: boolean;
  campaignId?: number;
}

export interface IAsset {
  account: string;
  spoilId: number;
  amount: number;
  Spoil: ISpoil;
}

export enum SettlerStatus {
  DIED = 2,
  OK = 1,
}
export interface INftAccount {
  id?: number;
  implementation: string;
  account: string;
  chainId: number;
  tokenContract: string;
  tokenId: number;
  salt: number;
  txHash: string;
  energy?: number;
  beginTime?: Date;
  version?: string;
  Asset: IAsset[];
  AccountMythic: IAsset[];
  balance?: LandTornNFT;
  clan?: string;
  joinedClan?: string;
  status: SettlerStatus;
}
export enum SpoilCategory {
  Weapons = 1,
  Wearables = 2,
  Spoils = 3,
  Mythic = 5,
}

export interface Spoil {
  id: number;
  name: string;
  attack: number;
  defense: number;
  shard: number;
  spoilTypeId: number;
  imageUrl: string;
  tokenId: number;
  dungeonTypeId: number;
  category: {
    id: SpoilCategory;
    name: string;
  };
}

export enum DungeonResponseType {
  NOTHING = 0,
  WIN = 1,
  DEAD = 2,
  YOU_SURVIED =  3,
  DIED_RECEIVE_MYTHIC = 4
}

export enum RewardType {
  SPOIL = 1,
  MYTHIC = 2,
}

export interface DungeonResult {
  type: DungeonResponseType;
  rewardType: RewardType;
  spoil: Spoil;
  amount: number;
}

export enum DungeonType {
  Dungeon_All = 0,
  Dungeon_1 = 1,
  Dungeon_2 = 2,
  Dungeon_3 = 3,
  Dungeon_4 = 4,
  Dungeon_5 = 5,
  Dungeon_6 = 6,
  Dungeon_7 = 7,
  Dungeon_8 = 8,
  Dungeon_9 = 9,
}

export const enum TornStatus {
  active = 1,
  dead = 2,
}

export type PaladinType = "Paladin" | "IronFist";

export interface ISacrificeReward {
  type: 1 | 2 | 3 | 4;
  name: string;
  shard: number;
  mythics: { account: string; mythicId: number; amount: number }[];
  fee: number;
}

export interface ISacrificeResult {
  id: number;
  sacrificeTx: string;
  txHash: string;
  amount: number;
  tokenId: number;
}

export interface IBaron {
  id: number;
  typeId: number;
  status: number;
  Type: {
    id: number;
    name: string;
    description: string;
    image: string;
    status: number;
  };
}

export enum SettlerType {
  Settler = 1,
  Baron = 2,
  Paladin = 3,
  IronFist = 4,
}

export interface ICampaign {
  id: number;
  description: string;
  spoilId: number;
  Spoil: ISpoil;
}

export interface IMarketItem {
  id: number;
  name: string;
  itemType: number;
  price: string;
  currency: string;
  value: number;
  image: string;
  itemId: number;
}

export interface ISpinAccountDetail {
  spinCount: number;
  winCount: number;
  spinAmount: number;
  balance: number;
  claimed: number;
}