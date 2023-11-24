declare var window: any;
import WalletConnectProvider from "@walletconnect/web3-provider";

const BINANCE_TESTNET = "https://data-seed-prebsc-1-s1.binance.org:8545/";

const walletConnectProviderOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        97: BINANCE_TESTNET,
        56: "https://bsc-dataseed.binance.org/",
      },
    },
  },
};



export const disconnectMetaMask = async () => {
  await window.ethereum.request({
    method: "eth_requestAccounts",
    params: [{ eth_accounts: {} }],
  });
};

