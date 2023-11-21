import { ethers } from "ethers";
import ERC20ABI from "./abi/ERC20ABI";
import ExchangeABI from "./abi/exchangeAbi";
import { EXCHANGE_CA, TOKEN_CA } from "@/constants/constants";

// 1. instantiate the contract
// 2. approve token
// 3. implement swap
// add Liquidity to the contract
// 4.

export async function SwapETHToToken(tokenAmount, ETHAmount) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = await provider.getSigner();

  const ERC20Contract = new ethers.Contract(TOKEN_CA, ERC20ABI, signer);
  const ExchangeContract = new ethers.Contract(
    EXCHANGE_CA,
    ExchangeABI,
    signer
  );

  //   const approve = async function (tokenAddress, amount) {
  const approveToken = await ERC20Contract.approve(TOKEN_CA, tokenAmount);
  console.log("Approving Token.....");
  await approveToken.wait();

  console.log("Approval Successful!");

  // ETH TO TOKEN SWAP
  console.log("Swapping ETH to Token.....");
  const swapETHToToken = await ExchangeContract.ethToTokenSwap(
    ETHAmount,
    tokenAmount
  );
  await swapETHToToken.wait();
  console.log("Swap Successful!");
}

export async function SwapTokenToETH(tokenAmount, ETHAmount) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = await provider.getSigner();

  const ERC20Contract = new ethers.Contract(TOKEN_CA, ERC20ABI, signer);
  const ExchangeContract = new ethers.Contract(
    EXCHANGE_CA,
    ExchangeABI,
    signer
  );

  //   const approve = async function (tokenAddress, amount) {
  const approveToken = await ERC20Contract.approve(TOKEN_CA, tokenAmount);
  console.log("Approving Token.....");
  await approveToken.wait();

  console.log("Approval Successful!");

  // TOKEN TO ETH
  console.log("Swapping ETH to Token.....");
  const swapTokenToETH = await ExchangeContract.tokenToETHSwap(
    ETHAmount,
    tokenAmount
  );
  await swapTokenToETH.wait();
  console.log("Swap Successful!");
}

export function NotSupported() {
  alert("Token Pair Not Yet Supported");
}
