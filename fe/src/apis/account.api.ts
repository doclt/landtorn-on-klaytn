import { DungeonResult, DungeonType, IBaron, ICampaign, INftAccount, ISacrificeResult, ISacrificeReward, ISpoil, LandTornNFT, TornStatus } from "@/types";
import axiosInstance from ".";
import { IDungeon } from "@/types/dungeon.type";

export const saveAccountInfo = async(model: Omit<INftAccount, 'id' | 'status'>)=> {
  return axiosInstance.post('account', model);
}

export const getAccountInfoByTokenId = async(tokenId: number): Promise<INftAccount> => {
  // return axiosInstance.get(`account/infor/${tokenId}`);
  return axiosInstance.get(`account/stat/${tokenId}`);
}

export const getListSpoil = async(dungeonType = DungeonType.Dungeon_All): Promise<ISpoil[]>=> {
  return axiosInstance.get(`account/spoil/${dungeonType}`);
}

export const dungeonResultByGameId = async(gameId: number): Promise<DungeonResult> => {
  return axiosInstance.get(`dungeon/result/${gameId}`);
}

export const dungeonGameResultByGameId = async(gameId: number): Promise<DungeonResult[]> => {
  return axiosInstance.get(`dungeon/gameResult/${gameId}`);
}

export const getEnergyByAccountAddress = async(accountAddress: string): Promise<{energy: number}> => {
  return axiosInstance.get(`account/energy/${accountAddress}`);
}

export const getListOfSettlerByWalletAddress = async(walletAddress: string, status: TornStatus = TornStatus.active): Promise<LandTornNFT[]> =>{
  return axiosInstance.get(`account/balance/${walletAddress}/${status}`);
}

export const getSacrificeListApi = async(accountAddress: string, type = 0): Promise<ISacrificeReward[]> => {
  return axiosInstance.get(`account/sacrifice/${accountAddress}/${type}`);
}

export const getSacrificeResultByTxApi = async(txHash: string): Promise<ISacrificeResult[]> => {
  return axiosInstance.get(`account/sacrifice/${txHash}`);
}

export const getDistributionByDungeonIdApi = async(dungeonId: number): Promise<IDungeon> => {
  return axiosInstance.get(`dungeon/distribution/${dungeonId}`);
}

export const checkBaronIsExistApi =async (accountAddress: string): Promise<IBaron> => {
  return axiosInstance.get(`account/torn/${accountAddress}`);
} 

export const getCampaignsApi =async (): Promise<ICampaign[]> => {
  return axiosInstance.get(`item/campaign`);
} 


export const checkByResultApi = async(txHash: string)=> {
  return axiosInstance.get(`marketplace/buyResult/${txHash}`)
}

