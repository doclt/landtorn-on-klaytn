export interface IEventResponse {
  transactionHash: string;
}
export interface IRequestInfo {
  player: string;
  bet: number;
  betAmount: number;
  result: number;
  hasResult: boolean;
  txHash?: string;
}