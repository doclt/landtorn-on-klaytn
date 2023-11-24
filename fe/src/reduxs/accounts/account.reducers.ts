import { createReducer } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { DungeonType, ISacrificeResult, ISpoil, LandTornNFT, SettlerStatus } from "@/types";

import {
  changeLoadingAction,
  disconnectMetamaskAction,
  fetchBalanceOfAccountAction,
  fetchNftAction,
  fetchTornDiedAction,
  getSacrificeResultByTxAction,
  handleChangeNftAction,
  logoutAction,
  setAccountEnergyAndBalanceAction,
  setConnectWalletAndMintSettlerAction,
  setIsFetchingSpoilsAction,
  setSelectedNftAction,
  setShardBalanceAction,
} from "./account.actions";

export const DEFAULT_MES = "Something error!";

export interface AccountState {
  web3Provider?: ethers.providers.Web3Provider;
  nfts: LandTornNFT[];
  
  nft?: LandTornNFT;
  isCreateNewNFT?: boolean;
  isFetchNft?: boolean;
  currentModal?: string;
  
  spoils: ISpoil[];
  isFetchSpoil?: boolean;
  shardBalance: number;
  accountEnergy: number;
  accountBalanceOf: number;
  accountAddress?: string;
  isConnectWalletAndMintSettler?: boolean;

  tornsDied: LandTornNFT[];
  isFetchingTornDied: boolean;
  sacrificeResult?: {shardBalance: number; totalMythic: number, mythics: ISacrificeResult[]};

  settlerStatus?: SettlerStatus;
}

const initialState: AccountState = {
  spoils: [],
  nfts: [],
  tornsDied: [],
  isFetchingTornDied: false,
  shardBalance: 0,
  accountEnergy: 0,
  accountBalanceOf: 0,
  isCreateNewNFT: false,
};

export const accountReducer = createReducer(initialState, (builder) => {

  builder.addCase(fetchNftAction.fulfilled, (state, {payload}) => {
    state.nfts = payload;
    state.nft = payload.length > 0 ? payload[payload.length - 1] : undefined;
    state.isFetchNft = false;
  })

  builder.addCase(fetchTornDiedAction.pending, (state) => {
    state.tornsDied = [];    
    state.isFetchingTornDied = true;
  })
  builder.addCase(fetchTornDiedAction.rejected, (state) => {
    state.isFetchingTornDied = false;
  })
  builder.addCase(fetchTornDiedAction.fulfilled, (state, {payload}) => {
    state.tornsDied = payload;    
    state.isFetchingTornDied = false;
  })
 

  builder.addCase(fetchNftAction.pending, (state) => {
    state.isFetchNft = true;
  })

  builder.addCase(fetchNftAction.rejected, (state) => {
    state.nfts = [];
    state.isFetchNft = false;
  })

  builder.addCase(handleChangeNftAction.pending, (state) => {
    state.isFetchSpoil = true;
  })
  builder.addCase(handleChangeNftAction.rejected, (state) => {
    state.spoils = [];
    state.isFetchSpoil = false;
  })

  builder.addCase(handleChangeNftAction.fulfilled, (state, {payload}) => {
    const {spoils, status} = payload;
    state.isFetchSpoil = false;
    state.spoils = spoils;
    state.settlerStatus = status;
  })

  builder.addCase(changeLoadingAction, (state, {payload}) => {
    state.isFetchNft = payload;
  })

  builder.addCase(setShardBalanceAction, (state, {payload}) => {
    state.shardBalance = payload;
  })

  builder.addCase(setAccountEnergyAndBalanceAction, (state, {payload}) => {    
    state.accountEnergy = payload.energy;
    state.accountBalanceOf =  payload.balance;
    state.accountAddress = payload.accountAddress;
  })

  builder.addCase(setSelectedNftAction, (state, {payload}) => {  
    state.nft = payload.nft;
    state.isCreateNewNFT = payload.isNew || false;
  })

  builder.addCase(setConnectWalletAndMintSettlerAction, (state, {payload}) => {    
    state.isConnectWalletAndMintSettler = payload;
  })

  builder.addCase(fetchBalanceOfAccountAction.fulfilled, (state, {payload}) => {    
    state.accountBalanceOf = payload;
  })


  builder.addCase(getSacrificeResultByTxAction.rejected, (state) => {    
    state.sacrificeResult = undefined;
  })
  builder.addCase(getSacrificeResultByTxAction.pending, (state, {payload}) => {    
    state.sacrificeResult = {shardBalance: 0, totalMythic:  0, mythics: []};
  })
  builder.addCase(getSacrificeResultByTxAction.fulfilled, (state, {payload}) => {    
    state.sacrificeResult = payload;
  })  

  builder.addCase(setIsFetchingSpoilsAction, (state, {payload}) => {    
    state.isFetchSpoil = payload;
  });

  
  // logout
  builder.addCase(logoutAction, (state) => {
    Object.assign(state, initialState);
  });
  builder.addCase(disconnectMetamaskAction, (state) => {
    state.web3Provider = undefined;
  });
});
