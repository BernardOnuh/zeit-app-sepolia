import React from 'react'
import Image from 'next/image'
import HeadComp from '@/layout/HeadComp'

const Invite = () => {
  return (
    <>
      <HeadComp title="Zeit | Invites" />
      <main className="pt-[126px]">
        <h1 className=" font-Inter text-[60px] relative font-[700] text-center mb-[16px]">
          Invites
          <Image width={23} height={1} src="/images/Star_3.svg" className="absolute top-[-38px] left-[56%]" alt="star_svg" />
          <Image width={23} height={1} src="/images/Star_2.svg" className="absolute left-[68%] top-[35%]" alt="star_svg" />
          <Image width={23} height={1} src="/images/Star_1.svg" className="absolute left-[30%] bottom-[-16%]" alt="star_svg" />
        </h1>
        <p className="text-[#4B5565] text-[18px] font-[500] mb-[50px] font-Inter text-center">Earn Rewards as your Invitee Trades.</p>
        <section className="w-[57%] py-[24px] mb-[77px] max-w-[824px] px-[32px] bg-[#FDF0F9] mx-auto rounded-[32px]">
          <div className="gap-[32px] mb-[16px] flex">
            <span className="flex-1"></span>
            <button className="medium-btn default-btn">Copy Link</button>
          </div>
          <div className="flex w-fit mx-auto gap-[21px]">
            <button className="">
              <Image width={20} height={1} src="/images/Twitter-Negative.svg" className="" alt="star_svg" />
            </button>
            <button className="">
              <Image width={20} height={1} src="/images/Discord-Negative.svg" className="" alt="star_svg" />
            </button>
            <button className="">
              <Image width={20} height={1} src="/images/Twitch-Negative.svg" className="" alt="star_svg" />
            </button>
          </div>
        </section>
      </main>
    </>
  )
}

export default Invite
