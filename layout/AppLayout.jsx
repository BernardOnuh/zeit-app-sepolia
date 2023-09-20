import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/router'

const AppLayout = () => {
    const {pathname, asPath, events} = useRouter()
	const navLinks = [
		{ key: 1, title: "Trade", path: "/app/trade" },
		{ key: 2, title: "Swap", path: "/app/swap" },
		{ key: 3, title: "Earn", path: "/app/earn" },
		{ key: 4, title: "Invites", path: "/app/invite" },
	]
    const links = navLinks.map(({path, key, title}) => (
		<Link key={key} href={path}>
            <li className={`${pathname === path || asPath === path ? "activeLink" : ""} font-Inter text-[#697586] font-[500] text-[16px] px-[16px] py-[8px]`}>{title}</li>
        </Link>
	))
  return (
    <>
        <header className={`fixed flex items-center justify-between bg-transparent backdrop-blur-sm w-full py-3 z-[3] px-[1rem] md:px-[2rem]`}>
            <div className="">
            <Link href="/">
                <Image src="/images/Logo.svg" alt="logo" height={50} width={50}/>
            </Link>
            </div>
            <nav className="w-fit border border-[#E3E8EF] rounded-[16px] px-[8px]">
                <ul className="flex justify-between">
                    {links}
                </ul>
            </nav>
            <div className="">
                <button className="l-trans-btn medium-btn">Connect Wallet</button>
            </div>
      </header>
    </>
  )
}

export default AppLayout
