import store from "@/reduxs/store";
import "@rainbow-me/rainbowkit/styles.css";
import "@/styles/animate.min.css";
import "@/styles/globals.css";
import theme from "@/themes/theme";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import {
  Chain,
  connectorsForWallets,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { goerli, klaytn } from "wagmi/chains";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { publicProvider } from "wagmi/providers/public";
import React from "react";
import { getWowJs } from "@/themes/config";
import { isProduction } from "@/utils/env.helpers";


const klaytnTestnetBaobab: Chain = {
  id: 1001,
  name: 'Klaytn Testnet',
  network: 'klaytn Testnet',  
  nativeCurrency: {
    decimals: 18,
    name: 'Klaytn',
    symbol: 'KLAY',
  },
  rpcUrls: {
    public: { http: ['https://public-en-baobab.klaytn.net'] },
    default: { http: ['https://public-en-baobab.klaytn.net'] },
  },
  blockExplorers: {
    default: { name: 'KlaytnScope', url: 'https://baobab.klaytnscope.com/' },
    etherscan: { name: 'KlaytnScope', url: 'https://baobab.klaytnscope.com/' },
  },  
  testnet: true,
};


const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    klaytnTestnetBaobab,
    klaytn,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [goerli] : []),
  ],
  [publicProvider()]
);

const projectId = "c8c689289f7b3547fc20222dfa21f7d2";
const { wallets } = getDefaultWallets({
  appName: "LAND TORN",
  projectId,
  chains,
});

const demoAppInfo = {
  appName: "Land Torn",
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: false,
  connectors,
  publicClient,
  webSocketPublicClient,
});

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface MyAppProps extends AppProps {
  Component: NextPageWithLayout;
}

export default function App({ Component, pageProps }: MyAppProps) {
  const getLayout = Component.getLayout ?? ((page) => page);

  React.useEffect(() => {
    getWowJs();
  }, []);

  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider
            appInfo={demoAppInfo}
            chains={chains}
            initialChain={isProduction() ? klaytn.id : klaytnTestnetBaobab.id}
          >
            <Head>
              <meta charSet="UTF-8" />
              <meta name="keywords" content="" />
              <meta name="author" content="" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
              />
            </Head>
            {getLayout(<Component {...pageProps} />)}
          </RainbowKitProvider>
        </WagmiConfig>
      </ChakraProvider>
    </Provider>
  );
}
