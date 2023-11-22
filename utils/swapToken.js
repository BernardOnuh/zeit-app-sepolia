import { ethers } from "ethers";
import ERC20ABI from "./abi/ERC20ABI";
import ExchangeABI from "./abi/exchangeAbi";
import { EXCHANGE_CA, TOKEN_CA } from "@/constants/constants";
import { toast } from "react-toastify"


// 1. instantiate the contract
// 2. approve token
// 3. implement swap
// add Liquidity to the contract
// 4.

export async function SwapETHToToken(tokenAmount, ETHAmount) {
  setLoadingState(true)
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
  toast.success("Approving Swap", {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  })
  await approveToken.wait();

  toast.success("Approval Successful, swapping..", {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  })

  // ETH TO TOKEN SWAP
  // console.log("Swapping ETH to Token.....");
  const swapETHToToken = await ExchangeContract.ethToTokenSwap(
    ETHAmount,
    tokenAmount
  );
  await swapETHToToken.wait();
  toast.success("Swap Successful", {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  })
  // setLoadingState(false)
}

export async function SwapTokenToETH(tokenAmount, ETHAmount) {
  // setLoadingState(true)
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
  toast.success("Approving Token...", {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  })
  await approveToken.wait();

  toast.success("Approval Successful, swapping...", {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  })

  // TOKEN TO ETH
  // console.log("Swapping ETH to Token.....");
  const swapTokenToETH = await ExchangeContract.tokenToETHSwap(
    ETHAmount,
    tokenAmount
  );
  await swapTokenToETH.wait();
  toast.success("Swap Successful", {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  })
  // setLoadingState(false)
}

export function NotSupported() {
  toast.success("Pair Not Supported yet", {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  })
}
