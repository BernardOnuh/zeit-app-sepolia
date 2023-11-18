import { ethers } from "ethers";
import { useData } from "@/context/DataContext";


export const connectWallet = async function (set) {
  const {setIsConnected} = useData()
  try {
    if (!window.ethereum) return console.log("No wallet installed");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();

    // Request the user's permission to switch to the Tenet testnet
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x9b" }], // Tenet testnet chain ID
    });

    // Check if the network has been switched to Tenet (Testnet)
    const network = await provider.getNetwork();
    if (network.chainId !== 155) {
      console.log("Failed to switch to Tenet testnet.");
      alert("Failed to switch to Tenet testnet.");
      return;
    }

    const address = await signer.getAddress();

    const truncatedAddress = address.slice(0, 4) + ".." + address.slice(-2);
    console.log(truncatedAddress);
    setIsConnected(true);
  } catch (err) {
    setIsConnected(false);
    console.error(err.message);
  }
};
