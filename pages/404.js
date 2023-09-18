import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useData } from "@/context/DataContext"
import HeadComp from '@/layout/HeadComp'

const ErrorPage = () => {
    const {mode} = useData()
  return (
    <>
      <HeadComp title="Zeit | Page Not Found" />
      <section className={`${mode ? "bg-white" : "bg-[#1E1E1E]"} pt-[23vh] px-[1rem] md:px-0 text-center transition-[.4s]`}>
          <h2 className={`${mode ? "text-[#121926]" : "text-white"} transition-[.4s] font-Inter text-[48px] md:text-[60px] font-[700]`}>
            404 - Looks like you’re Lost.
          </h2>
          <p className={`${mode ? "text-[#121926]" : "text-white"} transition-[.4s] text-[16px] md:text-[20px] font-Inter font-[400] my-[32px]`}>
          Chances are that this link is no longer active or that you’ve entered the wrong link. <br />
          You can double check the url or go back Home
          </p>
          <div className="w-fit mx-auto">
            <Link href="/">
              <button className={`default-btn text-center py-1 rounded-[8px] items-center font-Inter text-[16px] font-[500] text-white flex gap-[12px] pl-[9px] pr-[18px]`}>
                <Image src="/images/chevron-left.svg" className="" height={1} width={30} alt="chevron" />
                Return Home
              </button>
            </Link>
          </div>
          <Image src={`/images/${mode ? "error-white" : "error-dark"}.svg`} className="mt-[78px] pb-[1rem] transition-[.4s] w-fit mx-auto" height={1} width={243} alt="404 img" />
      </section>
    </>
  )
}

export default ErrorPage
