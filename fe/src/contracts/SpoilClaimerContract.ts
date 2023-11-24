import { ethers } from "ethers";
import { BaseInterface } from "./interfaces";
import claimer from "./abis/claimer.json";
import { getRPC } from "./utils/getRPC";
import { isProduction } from "@/utils/env.helpers";
import { DungeonType } from "@/types";

export const SPOIL_CLAIMER_ABI = claimer;
export const SPOIL_CLAIMER_ADDRESS = () =>
  isProduction()
    ? ""
    : "0x06c14E5Ae36Fc922Df1193B50d7c78FF15FC76Ae";

export class SpoilClaimerContract extends BaseInterface {
  private _feeDecimal = 18;
  constructor(signer: ethers.providers.JsonRpcSigner) {
    const rpcProvider = new ethers.providers.JsonRpcProvider(getRPC());
    super(rpcProvider, SPOIL_CLAIMER_ADDRESS(), SPOIL_CLAIMER_ABI, signer);
  }

  getGasFee = async(energy = 1, isNumber = true) => {
    const gasFee = await this._contract.gasFee(energy);
    console.log({gasFee})

    if (!isNumber) return this._toNumber(gasFee); 
    return this._toNumber(gasFee) / Math.pow(10, this._feeDecimal);
  }

  participate = async(energy: number, accountAddress: string, dungeonType: DungeonType) => {
    const gasFee = await this.getGasFee(energy, false); 
    const trans = await this._contract.participate(        
      accountAddress,
      dungeonType,
      energy,
      {...this._option, value: gasFee}
    );
    const arrs = await this._handleTransactionResponse(trans, true, 'Participated')
    return this._toNumber(arrs[4]);
  }
}