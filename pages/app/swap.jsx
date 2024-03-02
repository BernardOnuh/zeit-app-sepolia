import React, { useEffect, useState, useRef } from "react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useData } from "@/context/DataContext";
import { useAccount } from "wagmi";
import TradingViewWidget from "@/components/TradingViewWidget";
import Image from "next/image";
import HeadComp from "@/layout/HeadComp";
import Button from "../page/Button";
import { ethers } from "ethers";
// import setupConnection from "@/context/connection"
// import { 
//   getBalanceAndSymbol, 
//   getProvider, 
//   getSigner,getReserves } from "@/utils/ethereumFunctions";
// import { addLiquidity, quoteAddLiquidity } from "@/utils/liquidityFunctions";
import Input from "@/components/reusable comp/input";
import COINS from "@/constants/coins";
import TokenImg from "@/components/widgets/token-image";
import { useBalance,useContractRead, useContractWrite,erc20ABI } from 'wagmi'
import {RouterAbi} from "./router"
import { parseEther } from "viem";


const Swap = () => {
  const [numOne, numTwo] = COINS
  const { mode, setIsOnApp } = useData();
  const { isConnected, address } = useAccount();
  const [connectedState, setConnectedState] = useState(false)
  const [popUp, setModal] = useState(false);
  const [rotateStat, setStat] = useState(false);
  const [chartMod, setChartMod] = useState(false);
  const [firstToken, setFirstToken] = useState({name: "BTC", addy: "0xB77a3B530c4B268873dc7F5E6270Ef115A655E7F"});
  const [secondToken, setSecondToken] = useState({name: "USDT", addy: "0xC067882ff7528E878fbC85f876a1D4e1964d0dBa"});
  const [order, setOrder] = useState(null);
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [tokenAmount, setTokenAmount] = useState({
    firstTokenAmount: "0.0",
    secondTokenAmount: "0.0",
  });
  const router ="0x9e7429bDf634b9265f04F0E03149891bc957eD99";
  const WETH ="0xb5D8F883a4f330935a6Bd7d0857af126d48c9C32";


  const inputRef = useRef()
  const removeModal = () => {
    setModal(false);
  };


  useEffect(() => {
    if (isConnected === true) {
      setConnectedState(true)
    }
    else {
      setConnectedState(false)
    }
  }, [isConnected])
  const changeAmount = ({target}) => {
    const { name, value } = target
    setTokenAmount({
        ...tokenAmount,
        [name] : value
      })
  }
  const setMaxAmount = (value, name) => {
    setTokenAmount({
        ...tokenAmount,
        [name] : value
      })
  }

  const togglePopUp = (val) => {
    setModal(true);
    setOrder(val);
  };
  const handleSwitch = () => {
    setStat(true);
    setTimeout(() => setStat(false), 500);
    setFirstToken(secondToken);
    setSecondToken(firstToken);
    setSymbol(secondToken.name + firstToken.name);
  };
  const toggleChart = () => {
    setChartMod(!chartMod);
  };
  const selectToken = (abbrev, cAddress) => {
    if (abbrev == secondToken.name && order == "from") {
      setSecondToken({
        addy: firstToken.token,
        name: firstToken.name
      });
      setFirstToken({
        addy: cAddress,
        name: abbrev
      });
      setSymbol(abbrev + firstToken.name);
      setModal(false);
      return;
    } else if (abbrev == firstToken.name && order == "to") {
      setFirstToken({
        addy: secondToken.token,
        name: secondToken.name
      });
      setSecondToken({
        addy: cAddress,
        name: abbrev
      });
      setSymbol(secondToken.name + abbrev);
      setModal(false);
      return;
    }
    if (order == "from") {
      setFirstToken({
        addy: cAddress,
        name: abbrev
      });
      setSymbol(abbrev + secondToken.name);
    } else {
      setSecondToken({
        addy: cAddress,
        name: abbrev
      });
      setSymbol(firstToken.name + abbrev);
    }
    setModal(false);
  };

//// Add-Liquidity ///////
  const { data, isLoading, isSuccess, write: approveFirstToken } = useContractWrite({
    abi: erc20ABI,
    address: firstToken.addy,
    functionName: 'approve',
    args: [
      router,
      ethers.utils.parseEther(tokenAmount.firstTokenAmount.toString())
    ],
  });
  
  const { data: secondTokenData, isLoading: secondTokenLoad, isSuccess: secondTokenSuccess, write: approveSecondToken } = useContractWrite({
    abi: erc20ABI,
    address: secondToken.addy,
    functionName: 'approve',
    args: [
      router,
      ethers.utils.parseEther(tokenAmount.secondTokenAmount.toString())
    ],
  });
  const time = Math.floor(Date.now() / 1000) + 200000;
  const deadline = ethers.BigNumber.from(time)
  const { data:liquidityData, isLoading:liquidityLoading, isSuccess:liquiditySuccess, write: addliquidity } = useContractWrite({
    abi:RouterAbi,
    address: router,
    functionName: 'addLiquidity',
    args: [
      firstToken.addy,
      secondToken.addy,
      ethers.utils.parseEther(tokenAmount.firstTokenAmount.toString()),
      ethers.utils.parseEther(tokenAmount.secondTokenAmount.toString()),
      "0",
      "0",
      address,
      deadline
    ],
  });
  
  
  const handleApproveTokens = async () => {
    try {
      // Call the Approve function
      await approveFirstToken();
      console.log('First token approved successfully!');
      
      //await approveSecondToken();
      //console.log('Second token approved successfully!');
      await approveSecondToken();
      console.log('First token approved successfully!');

      await addliquidity();
      console.log('Liquidity added successfully!');
      
      console.log('All approvals and liquidity addition successful!');
    } catch (error) {
      console.error('Error while approving or adding liquidity:', error);
    }
};

/////////////////


////// AddLiquidityETH //////
const { data:liquidityDataEth, isLoading:liquidityLoadingEth, isSuccess:liquiditySuccessEth, write: addLiquidityEth } = useContractWrite({
  abi:RouterAbi,
  address: router,
  functionName: 'addLiquidityETH',
  //account:address,
  value: ethers.utils.parseEther(tokenAmount.secondTokenAmount.toString()),
  args: [
    firstToken.addy,
    ethers.utils.parseEther(tokenAmount.firstTokenAmount.toString()),
    "0",
    "0",
    address,
    deadline
  ],
});

const { data: thirdTokenData, isLoading: thirdTokenLoad, isSuccess: thirdTokenSuccess, write: approveThirdToken } = useContractWrite({
  abi: erc20ABI,
  address: WETH,
  functionName: 'approve',
  args: [
    router,
    ethers.utils.parseEther(tokenAmount.secondTokenAmount.toString())
  ],
});

const { data:swapExactTokensForTokensData, isLoading:swapExactTokensForTokensLoading, isSuccess:swapExactTokensForTokensSuccess, write: swapExactTokens } = useContractWrite({
  abi:RouterAbi,
  address: router,
  functionName:'swapExactTokensForTokens',
  args: [
    ethers.utils.parseEther(tokenAmount.firstTokenAmount.toString()),
    "0",
    [firstToken.addy, secondToken.addy],
    address,
    deadline
  ],
});

const handleApproveTokensETH = async () => {
  try {
    // Call the Approve function
    await approveFirstToken();
    console.log('First token approved successfully!');
    
    //await approveSecondToken();
    await approveThirdToken();
    console.log('First token approved successfully!');
    //console.log('Second token approved successfully!');
    
    await addLiquidityEth();
    console.log('Liquidity added successfully!');
    
    console.log('All approvals and liquidity addition successful!');
  } catch (error) {
    console.error('Error while approving or adding liquidity:', error);
  }
};
//////////////////


  
const { data: quote } = useContractRead({
  abi: RouterAbi,
  address: router,
  functionName: 'getAmountsOut',
  args: [
    ethers.utils.parseEther(tokenAmount.firstTokenAmount.toString()),
    [firstToken.addy, secondToken.addy],
  ],
});

// Update secondTokenAmount when quote becomes available
useEffect(() => {
  if (quote && quote.length > 1) {
    const formattedQuote = ethers.utils.formatEther(quote[1]);
    setTokenAmount(prevTokenAmount => ({
      ...prevTokenAmount,
      secondTokenAmount: formattedQuote,
    }));
  } else {
    // If quote is not returned, set secondTokenAmount to '0.0'
    setTokenAmount(prevTokenAmount => ({
      ...prevTokenAmount,
      secondTokenAmount: '0.0',
    }));
  }
}, [quote]);


//////// HANDLE SWAP BETWEEN TWO TOKENS /////
const { data:SwapTokenData, isLoading:SwapTokenLoading, isSuccess:SwapTokenSuccess, write: SwapToken } = useContractWrite({
    abi: RouterAbi,
    address: router,
    functionName: 'swapExactTokensForTokens',
    args: [
      ethers.utils.parseEther(tokenAmount.firstTokenAmount.toString()),
      "0",
      [firstToken.addy, secondToken.addy],
      address,
      deadline
    ],
  });


const SwapBetweenTokens = async () => {
  try {
    // Call the Approve function
    await approveFirstToken();
    console.log('First token approved successfully!');
    
    
    await SwapToken();
    console.log('Liquidity added successfully!');
    
    console.log('All approvals and liquidity addition successful!');
  } catch (error) {
    console.error('Error while approving or adding liquidity:', error);
  }
};

{/*
  const Approve = async (
    tokenAddress,
    routerContract,
    SpendAmount,
  ) => {
    try {
      const decimal = useContractRead({
        abi: erc20ABI,
        address: tokenAddress,
        functionName: 'decimals',
      });

      const amountIn = ethers.utils.parseUnits(SpendAmount, decimal.data);
      const { data, isLoading, isSuccess, write } = useContractWrite({
        abi: erc20ABI,
        address: tokenAddress,
        functionName: 'approve',
        args: [
          routerContract,
          amountIn
        ],
      });
      console.log('Transfer result:', result);
    } catch (error) {
      console.error('Error while transferring:', error);
    }
  };
*/}

//CHECK HERE



  const isButtonEnabled = () => {
    const { data: tokenBalOne } = useBalance({
      address: address,
      token: firstToken.addy,
    }); 
    const { data: tokenBalTwo } = useBalance({
      address: address,
      token: secondToken.addy,
    }); 
    // If both coins have been selected, and a valid float has been entered for both, which are less than the user's balances, then return true
    const parsedInput1 = tokenAmount.firstTokenAmount ;
    const parsedInput2 = tokenAmount.secondTokenAmount;
    return (
      firstToken.addy &&
      secondToken.addy &&
      parsedInput1 !== NaN &&
      0 < parsedInput1 &&
      parsedInput2 !== NaN &&
      0 < parsedInput2 &&
      parsedInput1 <= tokenBalOne.formatted.firstTokenAmount &&
      parsedInput2 <= tokenBalTwo.secondTokenAmount
    );
  };



const getCoinList = numOne[1].map(({ name, abbr, token, icon }) => {
  // Ensure that `token` is defined before rendering the button
  if (!address) {
    return null; // or handle it appropriately
  }

  // Fetch balance for each token
  function TokenComponent({ token }) {
  const { data: tokenData, error: tokenError, isLoading: tokenIsLoading } = useBalance({
    address: address,
    token: token,
  });

  if (tokenIsLoading) {
    return <div>Loading...</div>;
  }

  if (tokenError) {
    return <div>Error: {tokenError.message}</div>;
  }
  return (
    <div>
     {tokenData.formatted}
    </div>
  );
}

    return(
      <button
        key={token}
        onClick={() => selectToken(abbr, token)}
        className="my-[8px] w-full hover:bg-[#00000010] transition-[.4s] rounded-[8px] flex justify-between items-center py-[4px] px-[8px]"
      >
      
        <div className="flex items-center gap-[21px]">
          <TokenImg tokenType={abbr} />
          <div className="">
            <p className="text-[#364152] text-left text-[16px] font-[400] font-Inter">
              {abbr}
            </p>
            <p className="text-[#697586] text-left text-[12px] font-[400] font-Inter">
              {name}
            </p>
          </div>
        </div>
        <div className="">
          <p className="text-[#697586] text-[14px] font-[500] font-Inter text-right">
          <TokenComponent token={token}/>
          </p>
          <p className="text-[12px] font-Inter font-[600] text-[#17B26A] text-right">
            2.58
          </p>
        </div>
      </button>
    )
  })
  return (
    <>
      <HeadComp title="Zeit | Swap" />
      <main
        className={`${
          mode ? "bg-white" : "bg-[#1E1E1E]"
        } bg-sw pt-[96px] pb-[179px] transition-[.4s]`}
      >
        <section className="flex items-center md:w-[90%] gap-[32px] mx-auto">
          <div
            className={`transition-[.4s] w-[80%] hidden md:block rounded-[16px] sw-bxshdw ${
              chartMod ? "max-w-[100%] p-[16px]" : "max-w-0 invisible"
            } `}
          >
            <TradingViewWidget symbol={symbol} />
          </div>
          <div className="md:max-w-[584px] w-[95%] mx-auto bg-white rounded-[16px] sw-bxshdw md:w-[35%] p-[16px]">
            <h1 className="text-[#364152] text-[24px] font-Inter font-[600]">
              Swap
            </h1>
            <ConnectButton />
            <p className="font-Inter text-[16px] text-[#364152] mb-[16px] font-[400]">
              Instantly Trade Tokens
            </p>
        
            <hr className="mb-[16px] text-[#E3E8EF] bg-[#E3E8EF]" />
            <div className="h-[24px] mb-[16px] w-full">
              <span className="h-full flex gap-[16px] float-right">
                <button onClick={toggleChart} className="hidden md:block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M6 20V14"
                      stroke={chartMod ? "#5BC0BE" : "#000"}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18 20V10"
                      stroke={chartMod ? "#5BC0BE" : "#000"}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 20V4"
                      stroke={chartMod ? "#5BC0BE" : "#000"}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {/* <button className="">
                  <Image width={23} height={1} src="/images/fi_settings.svg" alt="settings" />
                </button> */}
              </span>
            </div>
            <div className="p-[8px] border border-[#E3E8EF] rounded-[16px]">
              <div className="h-[40px]">
                <button
                  onClick={() => togglePopUp("from")}
                  className="h-full rounded-[8px] w-fit font-Inter font-[400] text-[#364152] text-[14px] flex items-center p-[8px]"
                >
                  <TokenImg classNames="mr-[4px]" tokenType={firstToken.name} />
                  {firstToken.name}
                  <span className="ml-[8px]">
                    <Image
                      width={20}
                      height={1}
                      src="/images/fi_chevron.svg"
                      className=" "
                      alt="chevron"
                    />
                  </span>
                </button>
              </div>
              <Input 
                inputRef={inputRef} 
                setMaxAmount = {setMaxAmount}
                inputName="firstTokenAmount"
                tokenAmount={tokenAmount.firstTokenAmount}
                tokenAddress={firstToken.addy}
                changeAmount={changeAmount}
              />
            </div>
            <div className="my-[16px] mx-auto w-fit">
              <button onClick={handleSwitch} className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transition-[.4s] ${
                    rotateStat && "rotate-[90deg]"
                  }`}
                  width="40"
                  height="30"
                  viewBox="0 0 40 30"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.70864 19.5226C10.7949 21.4041 13.5106 21.4041 14.5969 19.5225L21.2039 8.07895H9.5042C8.40719 8.07895 7.5179 7.18965 7.5179 6.09265C7.5179 4.99564 8.4072 4.10635 9.5042 4.10635H23.4933C24.4471 2.24814 23.102 0.00195485 20.9789 0.00195467L3.32671 0.00195313C1.15413 0.00195294 -0.203721 2.35383 0.882565 4.23534L9.70864 19.5226Z"
                    fill="#5BC0BE"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M29.7874 9.49023C28.7011 7.60872 25.9854 7.60873 24.8991 9.49023L18.2965 20.9262H30.1609C31.2579 20.9262 32.1472 21.8155 32.1472 22.9125C32.1472 24.0095 31.2579 24.8988 30.1609 24.8988H16.0066C15.0452 26.7585 16.3911 29.0108 18.5171 29.0108H36.1693C38.3419 29.0108 39.6997 26.6589 38.6134 24.7774L29.7874 9.49023Z"
                    fill="#424242"
                  />
                </svg>
              </button>
            </div>
            <div className="p-[8px] border border-[#E3E8EF] rounded-[16px]">
              <div className="h-[40px]">
                <button
                  onClick={() => togglePopUp("to")}
                  className="h-full rounded-[8px] w-fit font-Inter font-[400] text-[#364152] text-[14px] flex items-center p-[8px]"
                >
                  <TokenImg classNames="mr-[4px]" tokenType={secondToken.name} />
                  {secondToken.name}
                  <span className="ml-[8px]">
                    <Image
                      width={20}
                      height={1}
                      src="/images/fi_chevron.svg"
                      className=" "
                      alt="chevron"
                    />
                  </span>
                </button>
              </div>
              <Input 
                inputRef={inputRef} 
                setMaxAmount = {setMaxAmount}
                inputName="secondTokenAmount"
                tokenAmount={tokenAmount.secondTokenAmount}
                changeAmount={changeAmount}
                tokenAddress={secondToken.addy}
              />
            </div>
            <div className="my-[16px] font-Inter text-[14px] font-[500] text-[#202939] flex justify-between items-center">
              <span className="">Slippage</span>
              <span className="">5%</span>
            </div>
            <section className="">
              {connectedState ? (
                <Button onClickHandler={handleApproveTokens}>
                  Swap
                </Button>
              ) : (
                <button disabled className="w-full medium-btn default-btn">Wallet Not Connected</button>
              )}
            </section>
          </div>
        </section>
        <section className="add-liquidity flex items-center md:w-[90%] gap-[32px] mx-auto">
          <div
            className={`transition-[.4s] w-[80%] hidden md:block rounded-[16px] sw-bxshdw ${
              chartMod ? "max-w-[100%] p-[16px]" : "max-w-0 invisible"
            } `}
          >
            <TradingViewWidget symbol={symbol} />
          </div>
          <div className="md:max-w-[584px] w-[95%] mx-auto bg-white rounded-[16px] sw-bxshdw md:w-[35%] p-[16px]">
            <h1 className="text-[#364152] text-[24px] font-Inter font-[600]">
              ADD LIQUIDITY
            </h1>
            <p className="font-Inter text-[16px] text-[#364152] mb-[16px] font-[400]">
              Instantly Addliquidity & Earn Fees
            </p>
        
            <hr className="mb-[16px] text-[#E3E8EF] bg-[#E3E8EF]" />
            <div className="h-[24px] mb-[16px] w-full">
              <span className="h-full flex gap-[16px] float-right">
                <button onClick={toggleChart} className="hidden md:block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M6 20V14"
                      stroke={chartMod ? "#5BC0BE" : "#000"}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18 20V10"
                      stroke={chartMod ? "#5BC0BE" : "#000"}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 20V4"
                      stroke={chartMod ? "#5BC0BE" : "#000"}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {/* <button className="">
                  <Image width={23} height={1} src="/images/fi_settings.svg" alt="settings" />
                </button> */}
              </span>
            </div>
            <div className="p-[8px] border border-[#E3E8EF] rounded-[16px]">
              <div className="h-[40px]">
                <button
                  onClick={() => togglePopUp("from")}
                  className="h-full rounded-[8px] w-fit font-Inter font-[400] text-[#364152] text-[14px] flex items-center p-[8px]"
                >
                  <TokenImg classNames="mr-[4px]" tokenType={firstToken.name} />
                  {firstToken.name}
                  <span className="ml-[8px]">
                    <Image
                      width={20}
                      height={1}
                      src="/images/fi_chevron.svg"
                      className=" "
                      alt="chevron"
                    />
                  </span>
                </button>
              </div>
              <Input 
                inputRef={inputRef} 
                tokenAmount={tokenAmount.firstTokenAmount}
                changeAmount={changeAmount}
              />
            </div>
            <div className="my-[16px] mx-auto w-fit">
              <button onClick={handleSwitch} className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transition-[.4s] ${
                    rotateStat && "rotate-[90deg]"
                  }`}
                  width="40"
                  height="30"
                  viewBox="0 0 40 30"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.70864 19.5226C10.7949 21.4041 13.5106 21.4041 14.5969 19.5225L21.2039 8.07895H9.5042C8.40719 8.07895 7.5179 7.18965 7.5179 6.09265C7.5179 4.99564 8.4072 4.10635 9.5042 4.10635H23.4933C24.4471 2.24814 23.102 0.00195485 20.9789 0.00195467L3.32671 0.00195313C1.15413 0.00195294 -0.203721 2.35383 0.882565 4.23534L9.70864 19.5226Z"
                    fill="#5BC0BE"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M29.7874 9.49023C28.7011 7.60872 25.9854 7.60873 24.8991 9.49023L18.2965 20.9262H30.1609C31.2579 20.9262 32.1472 21.8155 32.1472 22.9125C32.1472 24.0095 31.2579 24.8988 30.1609 24.8988H16.0066C15.0452 26.7585 16.3911 29.0108 18.5171 29.0108H36.1693C38.3419 29.0108 39.6997 26.6589 38.6134 24.7774L29.7874 9.49023Z"
                    fill="#424242"
                  />
                </svg>
              </button>
            </div>
            <div className="p-[8px] border border-[#E3E8EF] rounded-[16px]">
              <div className="h-[40px]">
                <button
                  onClick={() => togglePopUp("to")}
                  className="h-full rounded-[8px] w-fit font-Inter font-[400] text-[#364152] text-[14px] flex items-center p-[8px]"
                >
                  <TokenImg classNames="mr-[4px]" tokenType={secondToken.name} />
                  {secondToken.name}
                  <span className="ml-[8px]">
                    <Image
                      width={20}
                      height={1}
                      src="/images/fi_chevron.svg"
                      className=" "
                      alt="chevron"
                    />
                  </span>
                </button>
              </div>
              <Input 
                inputRef={inputRef} 
                tokenAmount={tokenAmount.secondTokenAmount}
                changeAmount={changeAmount}
              />
            </div>
            <div className="my-[16px] font-Inter text-[14px] font-[500] text-[#202939] flex justify-between items-center">
              <span className="">Slippage</span>
              <span className="">5%</span>
            </div>
            <section className="">
              {connectedState ? (
                <Button>
                  Swap
                </Button>
              ) : (
                <button disabled className="w-full medium-btn default-btn">Wallet Not Connected</button>
              )}
            </section>
          </div>
        </section>
      </main>
      <section
        className={`fixed ${!popUp && "scale-0"} ${
          mode ? "bg-[#00000029]" : "backdrop-blur-[9px] bg-[#00000075]"
        } transition-[.5s] z-[1] w-full top-0 bottom-0 bg-[#00000029]`}
      >
        <div
          className={`fixed p-[16px] w-[94%] left-[3%] md:w-[25%] md:left-[37.5%] rounded-[16px] ${
            mode ? "hero" : "bg-[#1E1E1E]"
          } h-fit top-[15vh]`}
        >
          <div className="flex mb-[8px] w-full justify-between">
            <p
              className={` font-Inter ${
                mode ? "text-[#000]" : "text-white"
              } text-[24px] font-[600]`}
            >
              Select Token
            </p>
            <button onClick={removeModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M18 6L6 18"
                  stroke={mode ? "black" : "white"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 6L18 18"
                  stroke={mode ? "black" : "white"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          {/* <p className="text-[16px] font-Inter font-[400]">
            Search using a Token name or Contract address
          </p>
          <div className="">
            <input
              type="text"
              className="w-full p-[6px] my-[16px] text-[#A3A3A3] font-Inter text-[16px] font-[400] text-input"
            />
          </div> */}
          <h3 className="font-Inter text-[16px] font-[700] mb-[16px]">
            Hot Tokens
          </h3>
          <div className="flex gap-[16px] overflow-x-auto mb-[12px] pb-[4px]">
            <button
              onClick={() => selectToken("BTC")}
              className="h-[40px] p-[8px] text-[#364152] font-Inter font-[400] flex items-center text-[14px]"
            >
              <TokenImg classNames="mr-[4px]" tokenType="BTC" />
              BTC
            </button>
            <button
              onClick={() => selectToken("ETH")}
              className="h-[40px] p-[8px] text-[#364152] font-Inter font-[400] flex items-center text-[14px]"
            >
              <TokenImg classNames="mr-[4px]" tokenType="ETH" />
              ETH
            </button>
            <button
              onClick={() => selectToken("USDT")}
              className="h-[40px] p-[8px] text-[#364152] font-Inter font-[400] flex items-center text-[14px]"
            >
              <TokenImg classNames="mr-[4px]" tokenType="USDT" />
              USDT
            </button>
          </div>
          <h3 className="font-Inter text-[16px] font-[700]">Token List</h3>
          <div className="overflow-y-auto max-h-[30vh]">
            {getCoinList}
          </div>
        </div>
      </section>
    </>
  );
};

export default Swap;
