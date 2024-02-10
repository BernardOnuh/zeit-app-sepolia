import React, { useEffect, useState, useRef } from "react";
import * as chains from "../constants/chains";
import {  ethers } from "ethers";
import { useWriteContract,useAccount } from 'wagmi'

const ROUTER = require("../abi/UniswapV2Router02.json");
const ERC20 = require("../abi/ERC20.json");
const FACTORY = require("../abi/IUniswapV2Factory.json");
const PAIR = require("../abi/IUniswapV2Pair.json");


const { writeContract } = useWriteContract();
const { isConnected, address } = useAccount();

export const Approve = async (
  tokenAddress,
  routerContract,
  SpendAmount,
) => {
  try {
    const result = await writeContract({
      abi:ERC20,
      address:tokenAddress,
      functionName: 'approve',
      args: [
        '0xd2135CfB216b74109775236E36d4b433F1DF507B',
        '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
        123n,
      ],
    });
    console.log('Transfer result:', result);
  } catch (error) {
    console.error('Error while transferring:', error);
  }
}