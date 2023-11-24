import { BigNumber, ethers } from "ethers";
import { BaseInterface } from "./interfaces";
import luckySpinAbi from "./abis/luckySpin.json";
import { getRPC } from "./utils/getRPC";
import { getMaxLoop, isProduction } from "@/utils/env.helpers";
import { TransactionResponse } from "@ethersproject/abstract-provider";
import { formatUnits, parseUnits } from "ethers/lib/utils";
import { timer } from "@/utils";
import { ISpinAccountDetail } from "@/types";


const OUTCOME = ['0x', '0.5x', '1.25x', '1.5x', '1.75x', '2.5x', '3x', '6x'];
export const ABI = luckySpinAbi;
export const ADDRESS = () =>
  isProduction()
    ? ""
    : "0xd0031C7128d21186aF5F84847065Cbf9afd3b75a";

export class LuckySpinContract extends BaseInterface {
  constructor(signer?: ethers.providers.JsonRpcSigner) {
    const rpcProvider = new ethers.providers.JsonRpcProvider(getRPC());
    super(rpcProvider, ADDRESS(), ABI, signer);
  }  

  private _getSpinResultByRequestId = async(requestId: string) => {
    const indexOfOutCome =  await this._contract.sRequestIdToResult(requestId);
    const index = this._toNumber(indexOfOutCome);
    if (!index) return undefined;
    return OUTCOME[index -1];    
  }

  spin = async(amount: number) => {    
    const unitAmount = parseUnits(`${amount}`, 8);
    const rp: TransactionResponse = await this._contract.spin(unitAmount, {
      ...this._option,
      value: this._toWei(3)
    });
    const rs = await this._handleTransactionResponse(rp, true, 'Spin');
    const requestId = rs[1];
    let MAX_LOOP = getMaxLoop();
    while (MAX_LOOP > 0) {
      MAX_LOOP-=1;
      try {
        const result = await this._getSpinResultByRequestId(requestId);
        if (!result) throw new Error('Something went wrong!');
        return result;
      } catch(ex) {
        if (MAX_LOOP < 1) throw new Error('Something went wrong!'); 
        await timer(2000);
      }
    }   
  }

  getAccountDetails = async(walletAddress: string)=> {
    const rs = await this._contract.sAccountDetail(walletAddress);
    const item: ISpinAccountDetail = {
      balance: this._toNumber(rs[0]),
      spinCount: this._toNumber(rs[3]),
      winCount: this._toNumber(rs[4]),
      spinAmount: this._toNumber(rs[2]),
      claimed: this._toNumber(rs[1]),
    }
    return item;
  }

  claim = async() => {
    await this._contract.claim(this._option);
  }
}