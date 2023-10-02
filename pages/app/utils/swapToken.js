import { ethers } from "ethers";
import ERC20ABI from "./abi/ERC20ABI";
import ExchangeABI from "./abi/exchangeAbi";

// 1.✅ instantiate the contract
// 2. approve token
// 3. implement swap
// add Liquidity to the contract
// 4.

const exchangeContractAddress = "0x936e5094B9aEd9C435e1D785E21de4e60B9056D6";
const tokenAddress = "0x423E55242aE82F4a8b96dfb278B6FB47B28717D9";

export default async function SwapToken(tokenAmount, ETHAmount) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = await provider.getSigner();

  const ERC20Contract = await ethers.Contract(
    tokenAddress,
    ExchangeABI,
    signer
  );
  const ExchangeContract = await ethers.Contract(
    exchangeContractAddress,
    ExchangeABI,
    signer
  );

  //   const approve = async function (tokenAddress, amount) {
  const approveToken = await ERC20Contract.approve(tokenAddress, tokenAmount);
  console.log("Approving Token.....");
  await approveToken.wait();

  console.log("Approval Successful!");
  //   };

  // ETH TO TOKEN SWAP
  console.log("Swapping ETH to Token.....");
  const swapETHToToken = await ExchangeContract.ethToTokenSwap(
    ETHAmount,
    tokenAmount
  );
  await swapETHToToken.wait();
  console.log("Swap Successful!");

  // TOKEN TO ETH
}
