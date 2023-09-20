import React from 'react'
import Image from 'next/image'
import HeadComp from '@/layout/HeadComp'
import { useData } from "@/context/DataContext"

const Swap = () => {
  const {mode} = useData()
  return (
    <>
      <HeadComp title="Zeit | Swap" />
      <main className={`${mode ? "bg-white" : "bg-[#1E1E1E]"} pt-[96px] transition-[.4s]`}>
        <section className="max-w-[584px] mx-auto bg-white rounded-[16px] w-[35%] p-[16px]">
          <h1 className="text-[#364152] text-[24px] font-Inter font-[600]">Swap</h1>
          <p className="font-Inter text-[16px] text-[#364152] mb-[16px] font-[400]">Instantly Trade Tokens</p>
          <div className="h-[24px] mb-[16px] w-full">
            <span className="h-full flex gap-[16px] float-right">
              <button className="">
                <Image width={23} height={1} src="/images/fi_bar-chart.svg" alt="settings" />
              </button>
              <button className="">
                <Image width={23} height={1} src="/images/fi_settings.svg" alt="settings" />
              </button>
            </span>
          </div>
          <div className="p-[8px] border border-[#E3E8EF] rounded-[16px]">
            <div className="h-[40px]">
              <div className="h-full rounded-[8px] w-fit font-Inter font-[400] text-[#364152] text-[14px] flex items-center p-[8px]">
                <Image width={23} height={1} src="/images/btc.svg" className=" mr-[4px]" alt="settings" />
                USDC
                <button className="ml-[8px]">
                  <Image width={20} height={1} src="/images/fi_chevron.svg" className=" " alt="chevron" />
                </button>
              </div>
            </div>
            <div className="h-[50px] my-[8px] bg-[#F8FAFC] rounded-[8px] p-[8px] flex justify-between items-center">
              <button className="py-[2px] px-[8px] rounded-[8px] text-[#697586] text-[14px] font-[400] font-Inter">MAX</button>
              <input type="number" className="text-[#9AA4B2] h-[30px] font-Inter text-[20px] w-[57px] bg-transparent outline-none font-[500]" placeholder="0.000"/>
            </div>
            <div className="h-[28px] flex justify-between mb-[8px]">
              <button className="l-trans-btn small-btn">25%</button>
              <button className="l-trans-btn small-btn">50%</button>
              <button className="l-trans-btn small-btn">75%</button>
              <button className="l-trans-btn small-btn">100%</button>
            </div>
          </div>
          <div className="my-[16px] mx-auto w-fit">
            <button className="">
              <Image width={27} height={1} src="/images/ellipse.svg" className="rotate-[-80deg]" alt="swap" />
            </button>
          </div>
          <div className="p-[8px] border border-[#E3E8EF] rounded-[16px]">
            <div className="h-[40px]">
              <div className="h-full rounded-[8px] w-fit font-Inter font-[400] text-[#364152] text-[14px] flex items-center p-[8px]">
                <Image width={23} height={1} src="/images/btc.svg" className=" mr-[4px]" alt="settings" />
                USDC
                <button className="ml-[8px]">
                  <Image width={20} height={1} src="/images/fi_chevron.svg" className=" " alt="chevron" />
                </button>
              </div>
            </div>
            <div className="h-[50px] my-[8px] bg-[#F8FAFC] rounded-[8px] p-[8px] flex justify-between items-center">
              <button className="py-[2px] px-[8px] rounded-[8px] text-[#697586] text-[14px] font-[400] font-Inter">MAX</button>
              <input type="number" className="text-[#9AA4B2] h-[30px] font-Inter text-[20px] w-[57px] bg-transparent outline-none font-[500]" placeholder="0.000"/>
            </div>
          </div>
          <div className="my-[16px] font-Inter text-[14px] font-[500] text-[#202939] flex justify-between items-center">
            <span className="">Slippage</span>
            <span className="">5%</span>
          </div>
          <div className="">
            <button className="w-full medium-btn default-btn">Connect Wallet</button>
          </div>
        </section>
      </main>
    </>
  )
}

export default Swap
