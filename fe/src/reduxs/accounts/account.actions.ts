import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { DungeonType, ISacrificeResult, ISpoil, LandTornNFT, RewardType, SettlerStatus, TornStatus } from "../../types";
import {
  getAccountInfoByTokenId,
  getListOfSettlerByWalletAddress,
  getSacrificeResultByTxApi,
} from "@/apis/account.api";
import store from "../store";
import { ShardContract } from "@/contracts/ShardContract";
import { getMaxLoop } from "@/utils/env.helpers";
import { timer } from "@/utils";
import { checkDailyPurchaseLimitAction, checkExitsBaronAction } from "../markets/market.action";
import { setSelectedTornTokenIdAction } from "../dungeons/dungeon.slice";

export const logoutAction = createAction("account/logoutAction");

export const disconnectMetamaskAction = createAction("account/disconnectMetamaskAction");

export const setIsFetchingSpoilsAction = createAction<boolean>("account/setIsFetchingSpoilsAction")

export const setConnectWalletAndMintSettlerAction = createAction<boolean| undefined>("account/setConnectWalletAndMintSettlerAction")

export const changeLoadingAction = createAction<boolean>("account/changeLoadingAction");

export const setShardBalanceAction = createAction<number>("account/setShardBalanceAction"
);

export const setSelectedNftAction = createAction<{
  nft: LandTornNFT | undefined;
  isNew: boolean;
}>("account/setSelectedNftAction");

export const setAccountEnergyAndBalanceAction = createAction<{
  energy: number;
  balance: number;
  accountAddress?: string;
}>("account/setAccountEnergyAction");

export const fetchNftAction = createAsyncThunk<LandTornNFT[], string>(
  "account/fetchNftAction",
  async (address) => {
    if (!address) {
      return [];
    }
    const settlers = await getListOfSettlerByWalletAddress(address);
    if (settlers.length > 0) {
      const settler = settlers[settlers.length - 1];
      await store.dispatch(handleChangeNftAction({tokenId: settler.tokenId, dType: DungeonType.Dungeon_All, walletAddress: address}));
    }
    return settlers;
  }
);

export const fetchBalanceOfAccountAction = createAsyncThunk<number, string>(
  "account/fetchBalanceOfAccountAction",
  async (accountAddress) => {
    try {
      const shardContract = new ShardContract();
      const accountBalanceOf = await shardContract.balanceOf(accountAddress);
      return accountBalanceOf;
    } catch (ex) {
      return 0;
    }
  }
);

export const handleChangeNftAction = createAsyncThunk<{
  spoils: ISpoil[], 
  dungeonType: DungeonType; 
  clan?: string;
  joinedClan?: string;
  status?: SettlerStatus;
},
 {tokenId: number, dType: DungeonType, walletAddress?: string}>(
  "account/handleChangeNftAction",
  async ({tokenId, dType, walletAddress}) => {
    const accountInfo = await getAccountInfoByTokenId(tokenId);
    let accountBalanceOf = 0;
    let energy = accountInfo.energy || 0;
    let accountAddress = '';
    const ritualStoneTokenId = 70;

    const typeIds = [
      ...new Set(
        accountInfo.Asset.filter((p) => p.Spoil.spoilTypeId !== 12).map((p) => p.Spoil.spoilTypeId)
      ),
    ] as number[];

    const highlightResult = typeIds.map((p) => {
      const rsFilter = accountInfo.Asset.filter((a) => a.Spoil.spoilTypeId === p);
      const maxDef = Math.max(...rsFilter.map((rs) => rs.Spoil.defense));
      const maxAtt = Math.max(...rsFilter.map((rs) => rs.Spoil.attack));
      return { typeId: p, maxDef, maxAtt };
    });

  
    const SORT_CONST = 1000;
    const spoils: ISpoil[] = accountInfo.Asset.map((p, index) => {
      const isActive = highlightResult.some((t) => t.typeId === p.Spoil.spoilTypeId && ((p.Spoil.attack && t.maxAtt === p.Spoil.attack) || (p.Spoil.defense && t.maxDef === p.Spoil.defense)));
      const sortVal = p.spoilId === ritualStoneTokenId ? Number.MAX_SAFE_INTEGER : ( p.Spoil.attack + p.Spoil.defense) * (isActive ? SORT_CONST : 1);
      const item: ISpoil= {...p.Spoil, rewardType: RewardType.SPOIL, sortVal, isActive};
      return item;
    });

    const mythics: ISpoil[] = accountInfo.AccountMythic.map(p => {
      const item: ISpoil= {
        ...p.Spoil, 
        id: p.Spoil.id,
        tokenId: p.Spoil.tokenId,
        attack: 0,
        defense: 0,
        shard: 0,
        rewardType: RewardType.MYTHIC,
        amount: p.amount,
        sortVal: Number.MAX_SAFE_INTEGER - p.Spoil.id
      };
      return item;
    });


    if (accountInfo && accountInfo.account) {
      accountAddress = accountInfo.account;
      try {
        const shardContract = new ShardContract();
        accountBalanceOf = await shardContract.balanceOf(accountInfo.account);
      } catch (ex) {
        console.log(ex);
      }
    }
    store.dispatch(setAccountEnergyAndBalanceAction({energy, balance: accountBalanceOf, accountAddress}));
    const spoilsReturn  = [...spoils, ...mythics];
    spoilsReturn.sort((a, b) => {return b.sortVal - a.sortVal})

    store.dispatch(setSelectedTornTokenIdAction({tokenId, energy}));
   
    await store.dispatch(checkExitsBaronAction(accountAddress));
    await store.dispatch(checkDailyPurchaseLimitAction(accountAddress));
    return {spoils: spoilsReturn, dungeonType: dType, status: accountInfo.status};
  }
);


export const fetchTornDiedAction = createAsyncThunk<LandTornNFT[], string>(
  "account/fetchTornDiedAction",
  async (address) => {
    if (!address) {
      return [];
    }
    const settlers = await getListOfSettlerByWalletAddress(address, TornStatus.dead);
    return settlers;
  }
);

export const getSacrificeResultByTxAction = createAsyncThunk<{shardBalance: number; totalMythic: number; mythics: ISacrificeResult[]}, string>(
  "account/getSacrificeResultByTxAction",
  async (txHash) => {   
    let maxLoop = getMaxLoop();
    while(maxLoop > 0) {
      try {
        maxLoop -=1;
        const rs = await getSacrificeResultByTxApi(txHash);
        const shardBalance = rs.find(p => p.tokenId === 0)?.amount || 0;
        const mythics = rs.filter(p => p.tokenId !== 0);
        const totalMythic = mythics.reduce((pre, cur) => pre + Number(cur.amount), 0);

        return {shardBalance, totalMythic, mythics}
      } catch(ex) {
        await timer(2000);
        if (maxLoop === 0) {throw new Error('oh oh')}
      }     
    }
    return {shardBalance: 0, totalMythic: 0, mythics: []}
  }
);


