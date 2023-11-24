import { ethers } from "ethers";
import { LandTornNFT } from "../types";
import { Erc20, Erc721 } from "./interfaces";
import landtornAbi from "./abis/lantorn.json";
import { getRPC } from "./utils/getRPC";
import { defaultAxios } from "@/apis";
import { TransactionResponse } from "@ethersproject/abstract-provider";
import { Result } from "ethers/lib/utils";
import { isProduction } from "@/utils/env.helpers";

export const LAND_TORN_ABI = landtornAbi;

export const LAND_TORN_ADDRESS = () =>
  isProduction()
    ? ""
    : "0x29c923c1414F0E714d5aC90943CBfe9fA8fB3f1a";

export class TornContract extends Erc721 {
  constructor(signer?: ethers.providers.JsonRpcSigner) {
    const rpcProvider = new ethers.providers.JsonRpcProvider(getRPC());
    super(rpcProvider, LAND_TORN_ADDRESS(), LAND_TORN_ABI, signer);
  }

  private _tokenOfOwnerIndex = async (address: string, index: number) => {
    const tokenId = await this._contract.tokenOfOwnerByIndex(address, index);
    return this._toNumber(tokenId);
  };

  private _tokenURI = async (tokenId: number) => {
    const urlMetadata = await this._contract.tokenURI(tokenId);
    return urlMetadata;
  };

  mintTornNft = async () => {
    const rp: TransactionResponse = await this._contract.safeMint();
    const args = (await this._handleTransactionResponse(
      rp,
      true,
      "Transfer"
    )) as Result;
    if (typeof args !== "string") {
      return this._toNumber(args[2]);
    }
    return -1;
  };

  getNftMetaData = async (address: string, index: number) => {
    const tokenId = await this._tokenOfOwnerIndex(address, index);
    if (tokenId > -1) {
      return {tokenId, name: `${tokenId}`} as LandTornNFT;

      // const url = await this._tokenURI(tokenId);
      // const rs = await defaultAxios.get(url);
      // return { ...rs.data, tokenId } as LandTornNFT;
    }
  };
  
}
