import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import HeadComp from '@/layout/HeadComp'
import { useData } from "@/context/DataContext"
import Link from 'next/link'


const Index = () => {
  const {mode} = useData()
  const { push } = useRouter()
  const handleModal = () => {
    const currLcn = new URL(window.location)
    currLcn.searchParams.set("modal", true)
    push(currLcn)
  }
  return (
    <>
      <HeadComp title="Zeit | Home" />
      <section className={`${mode ? "hero" : "bg-[#1E1E1E]"} py-[180px] transition-[.4s]`}>
        <div className="gap-1 items-center flex mx-auto w-fit">
          <Image src={`/images/Zeit-Logo.svg`} height={1} width={30} alt='logo' />
          <h5 className=" font-Inter text-[27px] wow fadeIn font-[600] text-[#828282]">Zeit protocol</h5>
        </div>
        <div className="w-fit mx-auto relative">
          <h1 className="hero-txt relative z-[2] text-center mb-[53px] font-Montserrat text-[100px] wow fadeInDown font-[800] leading-[115.4%]">
            Dawn of a new <br />
            trading era
          </h1>
          <div className="absolute top-[50%] flex z-[1] w-[100%] scale-[120%]">
            <div className=" wow fadeInDown left-[-179px]">
              <div className="relative">
                <Image src={`/images/hero-img-two.png`} className=""  height={1} width={450} alt='logo' />
                <Image src={`/images/Ellipse-hero.svg`} className="absolute bottom-[13%] z-[-1] left-[70%]"  height={1} width={20} alt='logo' />
              </div>
            </div>
            <Image src={`/images/hero-img-one.png`} className="wow fadeInDown"  height={1} width={500} alt='logo' />
          </div>
        </div>
        <div className="w-fit relative wow fadeIn z-[1] mx-auto">
          <button onClick={handleModal} className="button-index large-btn">Use DApp</button>
        </div>
      </section>
      <section className={` relative z-[-2] ${mode ? "bg-white" : "bg-[#1E1E1E]"}`}>
        <section className={`pt-[5rem] `}>
          <div className="flex flex-col gap-[4rem] md:flex-wrap md:gap-[24px] md:flex-row md:w-fit w-[90%] mx-auto justify-between">
            <div className={`text-center md:mx-auto bx-home rounded-[16px] ${mode ?  "bg-white" : "bg-[#1E1E1E] border border-[#202939]" } md:w-[294px] p-[16px] space-y-2`}>
              <Image src={`/images/${mode ? "flame-white" : "flame-black"}.svg`} className={`w-fit rounded-[50%] p-[12.3px] wow fadeInDown bx-i mx-auto`} height={1} width={10} alt='logo' />
              <h4 className={`${mode ? "text-[#364152]" : "text-[#EEEEEE]"} transition-[.4s] wow fadeInDown font-Inter font-[500] text-[22px]`}>Trade Futures Positions</h4>
              <p className={`${mode ? "text-[#5C5C5C]" : "text-[#BCBCBC]"} text-[18px] transition-[.4s] wow fadeInUp w-[60%] md:w-full mx-auto text-center font-Inter`}>Enter Hedged Positions with up to 50x leverage.</p>
            </div>
            <div className={`text-center md:mx-auto bx-home rounded-[16px] ${mode ?  "bg-white" : "bg-[#1E1E1E] border border-[#202939]" } md:w-[294px] p-[16px] space-y-2`}>
              <div className={`w-fit rounded-[50%] p-[12.3px] wow fadeInDown bx-i mx-auto`}>
                <Image src={`/images/${mode ? "swap-white" : "swap-black"}.svg`} className='p-[5px]'  height={1} width={50} alt='logo' />
              </div>
              <h4 className={`${mode ? "text-[#364152]" : "text-[#EEEEEE]"} transition-[.4s] wow fadeInDown font-Inter font-[500] text-[22px]`}>Swap Assets</h4>
              <p className={`${mode ? "text-[#5C5C5C]" : "text-[#BCBCBC]"} text-[18px] transition-[.4s] wow fadeInUo md:w-full mx-auto text-center font-Inter`}>Swap between token pairs right in one place.</p>
            </div>
            <div className={`text-center md:mx-auto bx-home rounded-[16px] ${mode ?  "bg-white" : "bg-[#1E1E1E] border border-[#202939]" } md:w-[294px] p-[16px] space-y-2`}>
              <Image src={`/images/${mode ? "stake-white" : "stake-black"}.svg`} className={`w-fit rounded-[50%] p-[12.3px] wow fadeInDown bx-i mx-auto`} height={1} width={10} alt='logo' />
              <h4 className={`${mode ? "text-[#364152]" : "text-[#EEEEEE]"} transition-[.4s] font-Inter wow fadeInDown font-[500] text-[22px]`}>Stake $ZET</h4>
              <p className={`${mode ? "text-[#5C5C5C]" : "text-[#BCBCBC]"} text-[18px] transition-[.4s] wow fadeInUp md:w-full mx-auto text-center font-Inter`}>Stake ZEI token and ZED stable token to earn juicy APY</p>
            </div>
            <div className={`text-center md:mx-auto bx-home rounded-[16px] ${mode ?  "bg-white" : "bg-[#1E1E1E] border border-[#202939]" } md:w-[294px] p-[16px] space-y-2`}>
              <Image src={`/images/${mode ? "revenue-white" : "revenue-black"}.svg`} className={`w-fit rounded-[50%] p-[12.3px] wow fadeInDown bx-i mx-auto`} height={1} width={10} alt='logo' />
              <h4 className={`${mode ? "text-[#364152]" : "text-[#EEEEEE]"} transition-[.4s] wow fadeInDown font-Inter font-[500] text-[22px]`}>Revenue Share</h4>
              <p className={`${mode ? "text-[#5C5C5C]" : "text-[#BCBCBC]"} text-[18px] transition-[.4s] wow fadeInUp md:w-full mx-auto text-center font-Inter`}>Invite Traders and Earn a percentage of their fees.</p>
            </div>
          </div>
          <div className={`absolute text-[144px] font-[900] font-Inter w-[80%] left-[10%] hidden md:block ${mode ? "text-[#EEF2F6]" : "text-[#2C2C2C]"} text-center z-[-1] translate-y-[6%]`}>Coming soon</div>
          <div className="mt-[7rem] mx-auto">
            <Image src={`/images/${mode? "frame-light" : "frame-dark"}.svg`} className="md:block hidden w-[80%] wow fadeInUp mx-auto" height={1} width={850} alt="laptop" />
            <Image src={`/images/${mode? "phone-light" : "phone-dark"}.svg`} className="w-fit md:hidden wow fadeInUp mx-auto" height={1} width={850} alt="laptop" />
          </div>
        </section>
        <div className="w-full h-[240px] bg-grad absolute translate-y-[50%] z-[-1] bottom-0"></div>
      </section>
      <section className={`${mode ? "bg-white" : "bg-[#1E1E1E]"} relative`}>
        <div className="relative z-[1] overflow-hidden">
          <h3 className={`font-Inter font-[600] text-white md:text-[60px] text-[48px] pt-[207px] tracking-[-1.2px] text-center`}>Join our waitlist</h3>
          <p className={`md:w-[40%] w-[90%] text-center text-[24px] tracking-[-0.48px] ${mode ? "text-[#4B5565]" : "text-[#9AA4B2]"} font-Inter font-[500] mx-auto mt-[21px] md:mt-[25px]`}>Be the first to use Zeit protocol, Trade derivatives, swap pairs and earn rewards.</p>
          <div className="w-fit mx-auto mt-[46px]">
            <button onClick={handleModal} className="button-index medium-btn">Join Waitlist</button>
          </div>
          <div className="w-fit mx-auto mt-[15px]">
            <Link className="" href="/component/terms" >
              <button className=" w-fit mx-auto link-btn small-btn ">Terms</button>
            </Link>
          </div>
          <h3 className={`md:text-[144px] text-[82px] leading-[99.5%] md:leading-[1.4] ${mode ? "text-white" : "text-[#323232]"} text-outline opacity-[0.5] font-[700] font-Inter text-center`}>Early access</h3>
          <div className="funny-div h-[500px] absolute top-[8rem] left-[25%] z-[-2] w-[50%]"></div>
          <div className="">
            <Image src="/images/chevron.svg" className="w-fit mt-[48px] mx-auto wow fadeIn" height={1} width={150} alt="laptop" />
          </div>
        </div>
      </section>
      <section className={`${mode ? "bg-white" : "bg-[#1E1E1E]"} relative transition-[.4s] pt-[8rem]`}>
        <div className="flex justify-center items-center w-[50%] md:w-full mx-auto">
          <Image src="/images/Logo-2.svg" className="w-fit wow fadeIn mx-auto" height={1} width={100} alt="logo" />
        </div>
        <p className={`${mode ? "text-black" : "text-white"} transition-[.4s] font-Comfortaa font-[600] md:w-[60%] text-[20px] w-[80%] mx-auto text-center wow fadeIn mt-[85px]`}>Zeit Protocol is built on Base and is powered by Optimism's OP Stack, making it one of the most secure, scalable EVM L2s out there. The OP Stack is an open-source public good that will serve as the foundation for a “superchain” of L2s that share interoperability, sequencing, and governance.</p>
        <div className="">
          <Image src="/images/chevron.svg" className="w-fit mt-[97px] mx-auto wow fadeIn" height={1} width={150} alt="laptop" />
        </div>
      </section>
      <section className={`${mode ? "bg-white" : "bg-[#1E1E1E]"} transition-[.4s] pt-[8rem] pb-[165px] text-center`}>
        <p className={`${mode ? "text-black" : "text-white"} transition-[.4s] w-[80%] text-[20px] mx-auto wow fadeIn font-Comfortaa pt-[9px] font-[600]`}>
          Open source, Free to use and Globally accessible <br />
          Join our community. Lets build together.
        </p>
        <div className={`${mode ? "text-black" : "text-white"} transition-[.4s] flex flex-col wow fadeInDown md:flex-row gap-[3rem] md:gap-0 md:w-[597px] w-fit mt-[49px] mx-auto justify-between`}>
          <button className={`${mode ? "tetiary-btn medium-btn" : "dark-trans-btn medium-btn"} transition-[.4s] gap-2`}>
            <Image src="/images/twitter.svg" height={1} width={20} alt="socials" />
            Twitter
            <Image src="/images/dot.svg" height={1} width={12} alt="socials" />
          </button>
          <button className={`${mode ? "tetiary-btn medium-btn" : "dark-trans-btn medium-btn"} transition-[.4s] gap-2`}>
            <Image src="/images/tg.svg" height={1} width={20} alt="socials" />
            Telegram
            <Image src="/images/dot.svg" height={1} width={12} alt="socials" />
          </button>
          <button className={`${mode ? "tetiary-btn medium-btn" : "dark-trans-btn medium-btn"} transition-[.4s] gap-2`}>
            <Image src="/images/discord.svg" height={1} width={20} alt="socials" />
            Discord
            <Image src="/images/dot.svg" height={1} width={12} alt="socials" />
          </button>
        </div>
        <div className="mt-[166px]">
          <h4 className={`${mode ? "text-black" : "text-white"} transition-[.4s] text-[20px] font-Comfortaa wow fadeInDown font-[600]`}>Stay Informed</h4>
          <div className="md:w-fit w-[80%] mt-[2rem] flex gap-4 md:gap-[18px] flex-col items-center md:flex-row justify-between mx-auto">
            <div className="md:w-[320px] relative w-full">
              <Image src="/images/mail.svg" className="absolute wow fadeIn top-[7px] left-[6px]" height={1} width={20} alt="socials" />
              <input type="text" className={`bg-transparent w-full py-1 pr-4 pl-9 wow fadeIn text-input`} placeholder="Enter Email address" />
            </div>
            <div className="md:block hidden w-fit">
              <button className={`${mode ? "tetiary-btn medium-btn" : "dark-trans-btn medium-btn"} transition-[.4s] w-full wow fadeIn md:block hidden`}>Sign Up for Newsletter</button>
            </div>
            <div className="w-full md:hidden">
              <button className={`default-btn medium-btn transition-[.4s] w-full wow fadeIn md:block hidden`}>Sign Up for Newsletter</button>
            </div>
          </div>
        </div>
      </section>
    </>
    
  )
}

export default Index
