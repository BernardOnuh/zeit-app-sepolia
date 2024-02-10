import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import Web3Provider from "./network";
import "@rainbow-me/rainbowkit/styles.css";
import { ToastContainer } from "react-toastify"
// import { Chain} from '@rainbow-me/rainbowkit'
import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
  connectorsForWallets
} from "@rainbow-me/rainbowkit";
import { 
  metaMaskWallet,
  walletConnectWallet,
  injectedWallet,
  rainbowWallet,
  trustWallet,
  braveWallet,
  coin98Wallet,
  coinbaseWallet,
  uniswapWallet,
  rabbyWallet ,
  zerionWallet
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, WagmiConfig } from "wagmi";
// import {
//   mainnet,
//   polygon,
//   optimism,
//   arbitrum,
//   base,
//   zora,
//   goerli,
//   sepolia,
// } from "wagmi/chains";
// import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
const isServer = typeof window === "undefined";
const WOW = !isServer ? require("wow.js") : null;
import Layout from "@/layout/Layout";
import "@/styles/globals.css";
import { DataGet } from "@/context/DataContext";

const arthera = {
  id: 10243,
  name: 'Arthera Testnet',
  network: 'arthera',
  iconUrl: 'https://pbs.twimg.com/profile_images/1732782618817552386/WNIvpxoT.jpg',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Arthera Testnet',
    symbol: 'AA',
  },
  rpcUrls: {
    public: { http: ['https://rpc-test.arthera.net'] },
    default: { http: ['https://rpc-test.arthera.net'] },
  },
  blockExplorers: {
    default: {  url: 'https://explorer-test.arthera.net' },
    etherscan: {  url: 'https://explorer-test.arthera.net' },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 11_907_934,
    },
  },
  testnet: false,
};



const { chains, publicClient } = configureChains(
  [arthera],
  [
    publicProvider(),
  ]
);

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      injectedWallet({ chains }),
      metaMaskWallet({projectId: "Johnex", chains}),
      rainbowWallet({ projectId: "Johnex", chains }),
      walletConnectWallet({ projectId: "Johnex", chains }),
      trustWallet({projectId: "Johnex", chains}),
      braveWallet({projectId: "Johnex", chains}),
      coin98Wallet({projectId: "Johnex", chains}),
      coinbaseWallet({projectId: "Johnex", chains}),
      uniswapWallet({projectId: "Johnex", chains}),
      zerionWallet({projectId: "Johnex", chains}),
      rabbyWallet({projectId: "Johnex", chains}),
    ],
  },
]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  useEffect(() => {
    new WOW().init();
  }, []);
  return (
    <SessionProvider>
      <DataGet>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider
            chains={chains}
            theme={lightTheme({
              accentColor: "#5BC0BE",
              accentColorForeground: "white",
            })}
          >
            
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </RainbowKitProvider>
        </WagmiConfig>
      </DataGet>
      <ToastContainer />
    </SessionProvider>
  );
}

{/*<Web3Provider render={(network) => (
  <Layout>
  <Component {...pageProps} network={network} />
</Layout>
)}>
</Web3Provider>*/}