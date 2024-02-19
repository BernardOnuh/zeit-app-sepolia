import * as chains from './chains';

// If you add coins for a new network, make sure Weth token (for the router you are using) is the first entry



const SEPOLIACoins = [
  {
    name: "Ether",
    abbr: "ETH",
    token: "", // Weth token is fetched from the router
    icon: "",
  },
  {
    name: "Bitcoin",
    abbr: "BTC",
    token: "0xB77a3B530c4B268873dc7F5E6270Ef115A655E7F",
    icon: "",
  },
  {
    name: "USDT",
    abbr: "USDT",
    token: "0xC067882ff7528E878fbC85f876a1D4e1964d0dBa",
    icon: "",
  },
  {
    name: "WETH",
    abbr: "WETH",
    token: "0xb5D8F883a4f330935a6Bd7d0857af126d48c9C32",
    icon: "",
  },
  {
    name: "TEST",
    abbr: "TEST",
    token: "0x7c5A3696966952535337E2Bce9A55e35B98c2105",
    icon: "",
  },
  {
    name: "NEXT",
    abbr: "NEXT",
    token: "0x1Bc365E5489747a31954799206E2Aa00048e7De8",
    icon: "",
  },
]

const ARTHERACoins = [
  {
    name: "Ether",
    abbr: "ETH",
    token: "", // Weth token is fetched from the router
    icon: "",
  },
  {
    name: "Wrapped Ethereum",
    abbr: "WETH",
    token: "0xb5D8F883a4f330935a6Bd7d0857af126d48c9C32",
    icon: "",
  },
  {
    name: "Pepecoin",
    abbr: "PEPE",
    token: "0x4014ac809C24A63F1775868325DAeEd32d45434b",
    icon: "",
  },
  {
    name: "Zeit token",
    abbr: "ZEIT",
    token: "0xBF5f70dc1c6CDe1c9EDec2fcFEf6a5cab60d11b4",
    icon: "",
  },
  {
    name: "USDT",
    abbr: "USDT",
    token: "0xC067882ff7528E878fbC85f876a1D4e1964d0dBa",
    icon: "",
  },
  {
    name: "Bitcoin",
    abbr: "BTC",
    token: "0xB77a3B530c4B268873dc7F5E6270Ef115A655E7F",
    icon: "",
  },
]

const COINS = new Map();
COINS.set(chains.ChainId.SEPOLIA, SEPOLIACoins);
COINS.set(chains.ChainId.ARTHERA, ARTHERACoins);

export default COINS
