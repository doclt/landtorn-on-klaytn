import { ethers } from "ethers";
import { BaseInterface } from "./interfaces";
import withdraw from "./abis/withdraw.json";
import { getRPC } from "./utils/getRPC";
import { isProduction } from "@/utils/env.helpers";

export const WITHDRAW_ABI = withdraw;
export const WITHDRAW_ADDRESS = () =>
  isProduction()
    ? ""
    : "";

export class WithdrawContract extends BaseInterface {
  constructor(signer?: ethers.providers.JsonRpcSigner) {
    const rpcProvider = new ethers.providers.JsonRpcProvider(getRPC());
    super(rpcProvider, WITHDRAW_ADDRESS(), WITHDRAW_ABI, signer);
  }

  private _getFee = async() => {
    return this._contract.fee();
  } 
  claim = async(accountAddress: string, rewardType: number): Promise<string> => {
    const value = await this._getFee();
    const response = await this._contract.claim(accountAddress, rewardType, {...this._option, value});
    return (await this._handleTransactionResponse(response)) as string;
  }
}