import { providers, utils } from "ethers";
import { getRPC } from "./getRPC";

export const getEthBalance = async(walletAddress: string) => {
  const provider = new providers.JsonRpcProvider(getRPC());
  const wei = await provider.getBalance(walletAddress);
  const eth = utils.formatEther(wei);
  return Number.parseFloat(eth);
}