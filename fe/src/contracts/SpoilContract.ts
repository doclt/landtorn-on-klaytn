import { ethers } from "ethers";
import { BaseInterface } from "./interfaces";
import spoil from "./abis/spoil.json";
import { getRPC } from "./utils/getRPC";
import { getListSpoil } from "@/apis/account.api";
import { isProduction } from "@/utils/env.helpers";
import { DungeonType } from "@/types";

export const SPOIL_ABI = spoil;
export const SPOIL_ADDRESS = () =>
  isProduction()
    ? ""
    : "0xc287eCE965C9660956405D0D1d0f68d754e60D15";

export class SpoilContract extends BaseInterface {
  constructor(signer?: ethers.providers.JsonRpcSigner) {
    const rpcProvider = new ethers.providers.JsonRpcProvider(getRPC());
    super(rpcProvider, SPOIL_ADDRESS(), SPOIL_ABI, signer);
  }

  _blanceOf = async (address: string, id: number) => {
    const tx = await this._contract.balanceOf(address, id);
    return this._toNumber(tx);
  };

  getSpoilsByAccountAddress = async (address: string, dType = DungeonType.Dungeon_All) => {
    const spoils = await getListSpoil(dType);
    const rs = await Promise.all(
      spoils.map(async (spoil) => {
        const balanceOf = await this._blanceOf(address, spoil.id);
        return {
          ...spoil,
          shard: spoil.shard, //* balanceOf
          attack: spoil.attack, //* balanceOf
          defense: spoil.defense, //* balanceOf
          balanceOf,
        };
      })
    );
    return rs.filter((p) => p.balanceOf > 0);
  };
}
