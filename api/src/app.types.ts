export interface IAccountCreated {
  account: string
  implementation: string
  chainId: bigint
  tokenContract: string
  tokenId: bigint
  salt: bigint
}
