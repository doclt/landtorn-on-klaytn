import { ethers } from "ethers";
import { BaseInterface } from "./interfaces";
import marketplace from "./abis/marketplace.json";
import { getRPC } from "./utils/getRPC";
import { isProduction } from "@/utils/env.helpers";

export const MARKETPLACE = marketplace;
export const MARKETPLACE_ADDRESS = () =>
  isProduction()
    ? ""
    : "0xf9A3bfc3DE9433707ec197a82943aC91d4E4d3D4";

export class MarketplaceContract extends BaseInterface {
  private BARON = 1;
  constructor(signer?: ethers.providers.JsonRpcSigner) {
    const rpcProvider = new ethers.providers.JsonRpcProvider(getRPC());
    super(rpcProvider, MARKETPLACE_ADDRESS(), MARKETPLACE, signer);
  }

  private _getBaronInEth = async()=> {
    const rs = await this._contract.itemInEth(this.BARON);
    return rs[1];
  }

  getItemInShard = async(id: number)=> {
    const rs = await this._contract.itemInShard(id);
    return this._toNumberBalance(rs[1], 8);
  }

  buyBaronByEth = async(accountAddress: string) => {
    const fee = await this._getBaronInEth();
    const rp= await this._contract.buyByEth(this.BARON, accountAddress, 1, {
      ...this._option,
      value: fee
    });
    return this._handleTransactionResponse(rp);
  }

  buyByShard = async(id: number, accountAddress: string, amount = 1) => {
    const rp = await this._contract.buyByShard(id, accountAddress, amount, this._option);    
    return this._handleTransactionResponse(rp);
  }

}