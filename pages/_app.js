import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
  goerli,
  sepolia,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
const isServer = typeof window === "undefined";
const WOW = !isServer ? require("wow.js") : null;
import Layout from "@/layout/Layout";
import "@/styles/globals.css";
import { DataGet } from "@/context/DataContext";

const { chains, publicClient } = configureChains([sepolia], [publicProvider()]);
const { connectors } = getDefaultWallets({
  appName: "ZeitProtocol",
  projectId: "Johnex",
  chains,
});
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
    </SessionProvider>
  );
}
