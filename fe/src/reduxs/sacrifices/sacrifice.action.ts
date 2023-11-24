import {
  getAccountInfoByTokenId,
  getEnergyByAccountAddress,
  getSacrificeListApi,
} from "@/apis/account.api";
import SacrificeSettlerContract from "@/contracts/SacrificeSettlerContract";
import { TornContract } from "@/contracts/TornContract";
import { getEthersSigner } from "@/hooks/useEtherSigner";
import { ISacrificeReward, ISpoil } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import store from "../store";
import { getSacrificeResultByTxAction } from "../accounts/account.actions";

export const fetchSacrificeRewardAction = createAsyncThunk<
  ISacrificeReward[],
  string
>("sacrifice/fetchSacrificeRewardAction", async (accountAddress) => {
  const items = await getSacrificeListApi(accountAddress, 0);
  return items;
});

export const sacrificeAction = createAsyncThunk<string | undefined,{ tokenId: number; accountAddress: string, option: number}>(
  "sacrifice/sacrificeAction",
  async ({ tokenId, accountAddress, option }) => {
    const signer = await getEthersSigner();
    if (!signer) return;
    const items = await getSacrificeListApi(accountAddress, 0);
    const optionSelected = items.find((p) => p.type === option);
    if (!optionSelected) return;
    const sacrificeContract = new SacrificeSettlerContract(signer);
    const tornContract = new TornContract(signer);
    await tornContract.approve(sacrificeContract._contractAddress, tokenId);
    const tx = await sacrificeContract.sacrifice(optionSelected.fee, accountAddress, optionSelected.type, option !== 4);  
    if (tx) {
      await store.dispatch(getSacrificeResultByTxAction(tx as string)).unwrap();
    }
    return tx as string;
  }
);
