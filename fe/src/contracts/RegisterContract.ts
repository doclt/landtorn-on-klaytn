import { ethers } from "ethers";
import { BaseInterface } from "./interfaces";
import register from "./abis/register.json";
import { getRPC } from "./utils/getRPC";
import { TransactionResponse } from "@ethersproject/abstract-provider";
import { LAND_TORN_ADDRESS } from "./TornContract";
import { saveAccountInfo } from "@/apis/account.api";
import { getChainId } from "@/utils";
import { isProduction } from "@/utils/env.helpers";

export const REGISTER_ABI = register;

export const REGISTER_ADDRESS = () =>
  isProduction()
    ? ""
    : "0x463dfd16CDA31e69F78d321c3726d45D5e5426b1";

const IMPLEMENTATION_ADDRESS = () =>
  isProduction()
    ? ""
    : "0x4D7BB9130c4ecE2ED6b89AF663AeBc039baE7e1C";

export class RegisterContract extends BaseInterface {
  constructor(signer: ethers.providers.JsonRpcSigner) {
    const rpcProvider = new ethers.providers.JsonRpcProvider(getRPC());
    super(rpcProvider, REGISTER_ADDRESS(), REGISTER_ABI, signer);
  }

  createAccount = async (tokenId: number, refName?: string) => {
    const chainId = getChainId();
    const tx: TransactionResponse = await this._contract.createAccount(
      IMPLEMENTATION_ADDRESS(),
      chainId,
      LAND_TORN_ADDRESS(),
      tokenId,
      0,
      "0x"
    );
    const tranHas = await this._handleTransactionResponse(tx,true, "AccountCreated");
    await saveAccountInfo({
      implementation: IMPLEMENTATION_ADDRESS(),
      account: tranHas[0],
      chainId: chainId,
      tokenContract: LAND_TORN_ADDRESS(),
      tokenId,
      salt: 0,
      txHash: tx.hash,
      Asset: [],
      AccountMythic: [],
      joinedClan: refName
    });
    return tranHas[0];
  };
}
