import { ethers } from "ethers";
import { BaseInterface } from "./interfaces";
import { getRPC } from "./utils/getRPC";
import { isProduction } from "@/utils/env.helpers";
import sacrificeAbi from './abis/sacrifice.json';
import { TransactionResponse } from "@ethersproject/abstract-provider";

export const Sacrifice_Settler_abi = sacrificeAbi;

export const Sacrifice_Settler_Address = () =>
  isProduction()
    ? "0x8c2E72d98a45019947f109415537b528cf71bef7"
    : "0xc8073C6Ff99F4E04e9e733515B7aAcAD1065bEF1";

export default class SacrificeSettlerContract extends BaseInterface {
  constructor(signer: ethers.providers.JsonRpcSigner) {
    const rpcProvider = new ethers.providers.JsonRpcProvider(getRPC());
    super(rpcProvider, Sacrifice_Settler_Address(), Sacrifice_Settler_abi, signer);
  }

  sacrifice = async(amount: number, accountAddress: string, type: 1 | 2 | 3 | 4, requireRitualStone: boolean)=> {
    const value = ethers.utils.parseEther(`${amount}`);
    const rp: TransactionResponse = await this._contract.sacrifice(     
      accountAddress,
      type,
      requireRitualStone,
      {
        ...this._option,
        value,
      }
    );
    return this._handleTransactionResponse(rp);
  }
}