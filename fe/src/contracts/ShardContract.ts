import { ethers } from "ethers";
import { BaseInterface, Erc20 } from "./interfaces";
import shard from "./abis/shard.json";
import { getRPC } from "./utils/getRPC";
import { isProduction } from "@/utils/env.helpers";

export const SHARD_ABI = shard;
export const SHARD_ADDRESS = () =>
  isProduction()
    ? ""
    : "0x64a9b3183ee8FFAfA9Ea47737eF4175753253F73";

export class ShardContract extends Erc20 {
  constructor(signer?: ethers.providers.JsonRpcSigner) {
    const rpcProvider = new ethers.providers.JsonRpcProvider(getRPC());
    super(rpcProvider, SHARD_ADDRESS(), SHARD_ABI, signer);
  }
}
