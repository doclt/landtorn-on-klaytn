import { ethers } from "ethers";
import { BaseInterface } from "./interfaces";
import mythic from "./abis/mythic.json";
import { getRPC } from "./utils/getRPC";
import { isProduction } from "@/utils/env.helpers";
import { DungeonType } from "@/types";

export const MYTHIC_ABI = mythic;
export const MYTHIC_ADDRESS = () =>
  isProduction()
    ? ""
    : "0x3f10fA31A38619388885792ED4A216E15d8023e3";

export class MythicContract extends BaseInterface {
  constructor(signer?: ethers.providers.JsonRpcSigner) {
    const rpcProvider = new ethers.providers.JsonRpcProvider(getRPC());
    super(rpcProvider, MYTHIC_ADDRESS(), MYTHIC_ABI, signer);
  }

  private _balanceOf = async(walletAddress: string, id: number): Promise<number> => {
    const balance = await this._contract.balanceOf(walletAddress, id);
    return this._toNumber(balance);
  }

  getMythicIds = async (walletAddress: string) => {
    const mythicIds = [1,2,3,4,5,6,7,8];
    const rs = await Promise.all(mythicIds.map(async(id) => {
      const balance = await this._balanceOf(walletAddress, id);
      return  balance > 0 ? id : -1;
    }));
    return rs.filter(p => p > 0);
  }
}