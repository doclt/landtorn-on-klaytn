import { Contract, Interface, JsonRpcProvider, ethers, formatUnits, parseUnits } from 'ethers'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { PRIVATE_KEY, RPC_URL, SHARD_ADDRESS, SPOIL_ADDRESS, TORN_ADDRESS } from './app.settings'
import { Erc20Abis } from './abis/erc20'
import { TornAbis } from './abis/torn'
import { RegistryAbi } from './abis/registry'
import { IAccountCreated } from './app.types'

export async function abis(name: string) {
  const path = join(__dirname, '..', 'abis', `${name}.json`)
  return JSON.parse(await readFile(path, 'utf8'))
}

export async function buildContract(abis: ethers.InterfaceAbi, address: string) {
  const provider = new ethers.JsonRpcProvider(RPC_URL)
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider)
  return new Contract(address, abis, wallet)
}

export async function tornOwner(tokenId: number) {
  const torn = await buildContract(TornAbis, TORN_ADDRESS)
  return await torn.ownerOf(tokenId)
}

export async function mintSpoil(accountAddress: string, spoilType: number) {
  const spoilAbis = await abis('spoil')
  const spoil = await buildContract(spoilAbis, SPOIL_ADDRESS)
  const receipt = await spoil.mint(accountAddress, spoilType, 1, '')
  console.log(receipt)
  return await receipt.wait()
}

export async function shardBalance(address: string): Promise<number> {
  const shard = await buildContract(Erc20Abis, SHARD_ADDRESS)
  const receipt: bigint = await shard.balanceOf(address)
  const decimals = await shard.decimals()
  return Number(receipt / BigInt(10) ** decimals)
}

export async function tornTokenIds(wallet: string) {
  const provider = new ethers.JsonRpcProvider(RPC_URL)
  const torn = new Contract(TORN_ADDRESS, TornAbis, provider)
  //tokenOfOwnerByIndex
  const tokenCount = Number(await torn.balanceOf(wallet))
  const tokenIds: number[] = []
  const tokenCountArray = Array.from(new Array(tokenCount).keys())
  while (tokenCountArray.length > 0) {
    const ids = await Promise.all(
      tokenCountArray.splice(0, 4).map(async (v) => {
        return await torn.tokenOfOwnerByIndex(wallet, v)
      })
    )
    tokenIds.push(...ids)
  }
  return tokenIds
}

export async function transaction(hash: string) {
  const provider = new JsonRpcProvider(RPC_URL)

  return await provider.getTransactionReceipt(hash)
}

export async function getEventRegistry(hash: string): Promise<IAccountCreated> {
  const provider = new JsonRpcProvider(RPC_URL)
  const tx: any = await provider.getTransactionReceipt(hash)
  const iface = new Interface(RegistryAbi)

  const eventData = iface.parseLog(tx.logs[0])?.args as unknown as IAccountCreated
  return eventData
}

export function formatShard(value: bigint) {
  return formatUnits(value, 8)
}

export function parseShard(value: number) {
  return parseUnits(value.toString(), 8)
}
