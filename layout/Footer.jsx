import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { useData } from "@/context/DataContext";

const Footer = () => {
  const {mode, setMode} = useData()
  return (
    <footer className={`w-full text-white py-6 px-[32px] md:px-[96px] transition-[.4s] gap-9 md:gap-0 flex-col-reverse md:flex-row flex justify-between md:items-center ${mode ? "bg-white" : "bg-[#1E1E1E]"} `}>
      <div className="flex md:gap-8 justify-between">
        <h5 className={` font-Comfortaa ${mode ? "text-[#1E3F8C]" : "text-white"}  text-[20px] font-[600]`}>Zeit Protocol</h5>
        <div className="flex items-center gap-2">
          <Image src={`/images/${mode ? "sun" : "dark"}.svg`} alt="mode" height={1} width={20} />
          <div className="container">
            <label htmlFor="btn">
                <div className={` ${mode ? "bg-white switch-shadow-light" : " bg-[#7A7A7A] rounded-[60px]"} transition-[.2s] cursor-pointer overflow-hidden flex w-[2rem] rounded-[5px] h-[1rem]`}>
                    <span className={`w-[50%] bg-[#fff] rounded-[50%] transition-[.5s] ${ mode ? "translate-x-[100%]" : "translate-x-0"}`}></span>
                    <span className={`w-[50%] bg-[#697586] rounded-[50%] transition-[.5s] ${ !mode ? "translate-x-[100%]" : "translate-x-0"}`}></span>
                </div>
                <button id="btn" onClick={() => setMode(!mode)} className="hidden">button</button>
            </label>
        </div>
        </div>
      </div>
      <div className="md:w-fit">
        <ul className={`flex gap-4 md:gap-[32px] text-[16px] font-[600] ${mode ? "text-[#202939]" : "text-white"} w-full flex-col md:flex-row md:items-center items-start font-Comfortaa`}>
          <Link href="/component/terms">
            <li className="">Terms of Use</li>
          </Link>
          <Link href="/component/privacy">
            <li className="">Privacy Policy</li>
          </Link>
          <Link href="/component/cookie">
            <li className="">Cookie Policy</li>
          </Link>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
