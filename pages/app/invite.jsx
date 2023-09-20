import React, { useRef, useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import HeadComp from '@/layout/HeadComp'
import { useRouter } from 'next/router'
import { useSession, signIn, signOut, } from 'next-auth/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Oval } from 'react-loader-spinner'
import supabase from '@/supabase'
import { useData } from "@/context/DataContext";
import Link from 'next/link';

const Invite = () => {
  const {mode} = useData()
  const clipBoardTxt = useRef()
  const [uStatus, setUStatus] = useState(false)
  const [iconStatus, setIconStatus] = useState(false)
  const [userIn, setUserIn] = useState(false)
  const [twtIconStatus, setTwtIconStatus] = useState(false)
  const [headerText, setHeaderText] = useState("Join Waitlist")
  const [indx, setIndx] = useState(null)
  const [rankIndx, setRankIndx] = useState(0)
  const { data: session, status } = useSession()
  const { push, asPath } = useRouter()
  const [popUp, setModal] = useState(false)
  const [urllRef, seturllRef] = useState(null)

  function findObjectRankByProperty(objects, propertyName, targetObject) {
    const targetValue = parseInt(targetObject[propertyName]);
  
    // Extract the property values from the objects
    const propertyValues = objects.map(obj => parseInt(obj[propertyName]));
  
    // Sort the property values in descending order
    propertyValues.sort((a, b) => b - a);
  
    const targetIndex = propertyValues.indexOf(targetValue);
  
    if (targetIndex === -1) {
      return "Object not found in the array";
    }
  
    // Calculate the rank of the target value
    const rank = targetIndex + 1;
    let rankString;
    if (rank === 1) {
      rankString = "1st";
    } else if (rank === 2) {
      rankString = "2nd";
    } else if (rank === 3) {
      rankString = "3rd";
    } else if (rank > 99) {
      rankString = "99+";
    } else {
      rankString = `${rank}th`;
    }
    setRankIndx(rankString)
  }

  
  
  const checkRef = () => {
      const refVal = window.location.search
      const refer = new URLSearchParams(refVal).get("iv")
      if ( refer != null && refer != "") {
        seturllRef(refer)
      }
    }
    useEffect(() => {
      checkRef()
    }, [urllRef])
    const readUPresence = async () => {
      let userIsPresent = false
      let refId = null
      let formerRefCount = null
      if (urllRef != null && urllRef != "") {
        let tof = false
        try {
          const { data, error } = await supabase
          .from('users')
          .select('screen_name, id, referral_count')
          for (let i = 0; i < data.length; i++) {
            if (data[i].screen_name === urllRef) {
              tof = true
              refId = data[i].id
              formerRefCount = data[i].referral_count
              break 
            }
          }
          if (tof) {
            userIsPresent = true
          }
        }
        catch (err) {
          toast.warn('Network connection error, try refreshing this page', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: mode? "light" : "dark",
            });
            return
        }
      }
      let bool = true 
      if (userIsPresent && bool) {
        let newRef = parseInt(formerRefCount) + 1
        bool = false
        try{
          const { error } = await supabase
            .from('users')
            .update({ referral_count: newRef })
            .eq('id', refId)
        }
        catch (err) {
          // toast.warn('Network connection error', {
          //   position: "top-right",
          //   autoClose: 1000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   theme: mode? "light" : "dark",
          //   });
            return
        }
      } 
    }

  const handleModal = () => {
    const currLcn = new URL(window.location)
    currLcn.searchParams.set("modal", true)
    push(currLcn)
  }
  const removeModal = () => {
    const currLcn = new URL(window.location)
    currLcn.searchParams.delete("modal")
    push(currLcn)
  }
  const checkForModal = useCallback(() => {
    const keysVals = window.location.search
    const urlPrms = new URLSearchParams(keysVals).get("modal")
    if (urlPrms == 'true') {
      setModal(true)
    }
    else {
      setModal(false)
    }
  }, [asPath])
  useEffect(()=> {
    checkForModal()
  }
  ,[checkForModal])
  const iconChange = () => {
    if (iconStatus) {
      return (
        <Oval
          height="20"
          width="30"
          radius="9"
          color="white"
          ariaLabel="loading"
          wrapperStyle
        />
      )
    }
    else {
      return <Image src={`/images/user-follow.svg`} height={1} width={20} alt="twitter-svg" />
    }
  }
  const twtIconChange = () => {
    if (twtIconStatus) {
      return (
        <Oval
          height="20"
          width="30"
          radius="9"
          color="white"
          ariaLabel="loading"
          wrapperStyle
        />
      )
    }
    else {
      return <Image src={`/images/twwt.svg`} height={1} width={20} alt="twitter-svg" />
    }
  }
  const redr = () => {
    window.open(`https://twitter.com/intent/tweet?text=I%27ve%20joined%20the%20Waitlist%20for%20%40zeitprotocol%20as%20${session.user.name}.%20%0A%0AZeit%20is%20building%20the%20best%20perpetual%20DEx%20on%20%40buildonbase.%0A%0AJoin%20to%20earn%20rewards%20from%20trading%20fees.%0A%0Ahttps%3A%2F%2Fzeitprotocol.xyz%2F%3Fiv%3D${session.screenName}%0A%0A%23Buildonbase%20%23zeitprotocol%20%24Base%0A%0A`, "_blank")
  }
  const userFollow = async () => {
    let updateDataCondition = true
    setUserIn(false)
    try { 
      const { data, error } = await supabase
      .from('users')
      .select('screen_name, referral_count')
      for (let i = 0; i < data.length; i++) {
        if (data[i].screen_name === session.screenName) {
          setUStatus(true)
          setIndx(data[i].referral_count)
          setHeaderText("Waitlist")
          updateDataCondition = false
          break 
        }
        else {
          setUserIn(true)
        }
      }
    }
    catch (error) {
      toast.warn('Network connection error, please refresh this page', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: mode? "light" : "dark",
        });
        setUserIn(true)
        return
    }
    if (updateDataCondition) {
      setIconStatus(true)
      readUPresence()
      window.open("https://twitter.com/intent/follow?user_id=1686664430195523584", "_blank")
      try {
        const { error } = await supabase
        .from('users')
        .insert({ email: session.user.email, screen_name: session.screenName, referral_count: 0, username: session.user.name, user_t_id: session.uId })
        // you can always log error if data didn't get to the server here using the error param above
      } catch (error) {
        // toast.warn('Network connection error', {
        //   position: "top-right",
        //   autoClose: 1000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: mode? "light" : "dark",
        //   });
          return
      }   
      setTimeout(async() => {
        await setIconStatus(false)
      }, 10000)
    }
    else {
      handleUsers()
    }
  }
  const oauthSignin = () => {
    setTwtIconStatus(true)
    signIn("twitter")
    setTimeout(() => {
      setTwtIconStatus(false)
    }, 80000)
  }
  const handleRefRank = async () => {
    try {
      const { data, error } = await supabase
      .from('users')
      .select('referral_count')
      const targetObject = { referral_count: indx };
      const propertyName = 'referral_count';
      const result = findObjectRankByProperty(data, propertyName, targetObject);
      console.log(result)
    }
    catch (err) {
      return
    }
  }
  if (indx != null) {
    handleRefRank()
  }
  const handleUsers = async () => {
    try { 
      const { data, error } = await supabase
      .from('users')
      .select('screen_name, referral_count')
      for (let i = 0; i < data.length; i++) {
        if (data[i].screen_name === session.screenName) {
          setUStatus(true)
          setIndx(data[i].referral_count)
          setHeaderText("Waitlist")
          break 
        }
        else {
          setUserIn(true)
        }
      }
    }
    catch (error) {
      // toast.warn('Network connection error', {
      //   position: "top-right",
      //   autoClose: 1000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: mode? "light" : "dark",
      //   });
        setUserIn(true)
        return
    }
  }
  const handleCopy = () => {
    navigator.clipboard.writeText(clipBoardTxt.current.innerText)
    toast.success('Copied to clipboard', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: mode? "light" : "dark",
    });
  }
  if (session) {
    handleUsers()
  }

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
            <button className="l-trans-btn small-btn">
              <Image width={20} height={1} src="/images/Twitter-Negative.svg" className="" alt="twitter_svg" />
            </button>
            <button className="l-trans-btn small-btn">
              <Image width={20} height={1} src="/images/Discord-Negative.svg" className="" alt="discord_svg" />
            </button>
            <button className="l-trans-btn small-btn">
              <Image width={20} height={1} src="/images/Twitch-Negative.svg" className="" alt="twitch_svg" />
            </button>
          </div>
        </section>
        <section className={`${mode ? "bg-[#00000029]" : "backdrop-blur-[9px] bg-[#00000075]"} transition-[.5s] z-[1] w-full top-0 bottom-0 bg-[#00000029]`}>
        <div className={`md:p-[32px] p-[25px] w-[94%] left-[3%] md:w-[38%] md:left-[31%] rounded-[16px] ${mode ? "hero" : "bg-[#1E1E1E]"} h-fit top-[10vh] z-[1]`}>
          <div className="flex w-full justify-between">
            <p className={` font-Inter ${mode ? "text-[#202939]" : "text-white"} text-[20px] font-[600]`}>{headerText}</p>
            <button onClick={removeModal}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18" stroke={mode? "black" : "white"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 6L18 18" stroke={mode? "black" : "white"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            </button>
          </div>
          { status == "loading" ? (
            <>
              <div className="mx-auto w-fit mt-[32px]">
                <button disabled className="flex h-[36px] default-btn small-btn items-center px-[14px] gap-1 font-Inter text-[14px] text-white rounded-[8px]">
                  <Oval
                    height="20"
                    width="30"
                    radius="9"
                    color="white"
                    ariaLabel="loading"
                    wrapperStyle
                  />
                  Connecting to twitter
                </button>
              </div>
              <div className="mx-auto w-fit mt-[16px]">
                <button disabled className={`flex cursor-pointer h-[36px] ${mode ? "bg-[#ACC5FF] text-white" : "bg-[#697586] text-[#BDBDBD]"}  items-center px-[14px] gap-1 font-Inter text-[14px] rounded-[8px]`}>
                  <Oval
                    height="20"
                    width="30"
                    radius="9"
                    color="white"
                    ariaLabel="loading"
                    wrapperStyle
                  />
                  Follow on twitter
                </button>
              </div>
              <p className={`mt-[32px] font-Inter font-[400] text-[14px] ${mode ? "text-black" : "text-[#E3E8EF]"} `}>
                We would send feature updates to the email address affiliated to your twitter account
              </p>
            </>
          ) : (
            <>
              {session ? (
                <>
                  <div className="flex justify-between items-center mt-[32px]">
                    <p className={` font-Inter font-[600] ${mode? "text-[#364152]" : "text-[#FCFCFD]"} text-[14px]`}>{session.user.name}</p>
                    <button onClick={() => signOut({ redirect: false})} className={`small-btn destr-trans-btn`}>
                      <Image src="/images/disconnect.svg" className="mr-[8px]" height={1} width={22} alt="close-svg" />
                      Disconnect
                    </button>
                  </div>
                  <div className="mx-auto w-full mt-[16px]">
                  {
                    uStatus ? (
                      <>
                        <p className={`font-Inter text-[16px] text-center font-[600] ${mode? "text-black" : "text-white"} mb-[16px]`}>You’re on the Waitlist!</p>
                        <hr className={mode? "border-[#E3E8EF]" : "border-[#4B5565]"}/>
                        <p className={`${mode? "text-[#121926] bg-white" : "text-[#F8FAFC] bg-[#1E1E1E]" } font-Inter font-[400] text-[14px] translate-y-[-50%] px-2 w-fit mx-auto`}>Share</p>
                        <div className="">
                          <p className={`font-Inter font-[400] text-[14px] mb-[16px] ${mode? "text-black" : "text-[#EEF2F6]"}`}>Invite Link</p>
                          <div className={`border rounded-[4px] flex justify-between items-center ${mode? "border-[#E3E8EF]" : "border-[#4B5565]"}`}>
                            <p ref={clipBoardTxt} className={`font-Inter hidden md:block font-[400] text-[14px] text-[#A3A3A3] ${mode? "border-[#B8B8B8]" : "border-[#4B5565]"} py-[10px] border-r flex-1 px-[14px]`}>
                              https://zeitprotocol.xyz/?iv={session.screenName}
                            </p>
                            <p className={`font-Inter md:hidden font-[400] text-[14px] text-[#A3A3A3] ${mode? "border-[#B8B8B8]" : "border-[#4B5565]"} py-[10px] border-r flex-1 px-[14px]`}>
                              https://zeitprotocol.xyz/...
                            </p>
                            <div className="px-[14px] py-[10px]">
                              <button onClick={handleCopy} className={`font-Inter cursor-pointer flex items-center gap-[8px] font-[600] text-[16px] ${mode? "text-[#202939]" : "text-[#EEF2F6]"}`}>Copy
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                  <g clipPath="url(#clip0_537_2719)">
                                    <path d="M13.3333 6H7.33333C6.59695 6 6 6.59695 6 7.33333V13.3333C6 14.0697 6.59695 14.6667 7.33333 14.6667H13.3333C14.0697 14.6667 14.6667 14.0697 14.6667 13.3333V7.33333C14.6667 6.59695 14.0697 6 13.3333 6Z" stroke="#666666" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M3.3335 10H2.66683C2.31321 10 1.97407 9.85953 1.72402 9.60949C1.47397 9.35944 1.3335 9.0203 1.3335 8.66668V2.66668C1.3335 2.31305 1.47397 1.97392 1.72402 1.72387C1.97407 1.47382 2.31321 1.33334 2.66683 1.33334H8.66683C9.02045 1.33334 9.35959 1.47382 9.60964 1.72387C9.85969 1.97392 10.0002 2.31305 10.0002 2.66668V3.33334" stroke="#666666" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_537_2719">
                                      <rect width="16" height="16" fill="white"/>
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="mt-[16px]">
                          <button onClick={redr} className="default-btn medium-btn gap-[12px] items-center text-white justify-center bg-[#3772FF] w-full">
                            <Image height={1} width={20} alt="share" src="/images/share.svg"/>
                            Share to Twitter
                          </button>
                        </div>
                        <div className="mt-[32px]">
                          <hr className={mode? "border-[#E3E8EF]" : "border-[#4B5565]"} />
                          <p className={`${mode? "text-[#121926] bg-white" : "text-[#F8FAFC] bg-[#1E1E1E]" } font-Inter font-[400] text-[14px] translate-y-[-50%] px-2 w-fit mx-auto`}>My position</p>
                          <p className="flex items-center justify-between">
                            <span className={`${mode? "text-[#121926]" : "text-[#EEF2F6]"} text-[14px] font-Inter font-[400]`}>Rank</span>
                            <span className={`${mode? "text-[#121926]" : "text-[#EEF2F6]"} text-[14px] font-Inter font-[400]`}>Number of Refs</span>
                          </p>
                          <div className={`${mode? "bg-[#F8FAFC] text-black" : "bg-transparent text-white"} flex items-center justify-between p-[8px] rounded-[8px]`}>
                            <span className="text-[14px] font-Inter font-[400]">{rankIndx}</span>
                            <span className="text-[14px] font-Inter font-[400]">{indx}</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-fit mx-auto">
                          <button onClick={ userFollow } className="default-btn small-btn gap-1 ">
                            {userIn ? iconChange() :
                              <Oval
                                height="20"
                                width="30"
                                radius="9"
                                color="white"
                                ariaLabel="loading"
                                wrapperStyle
                              />
                            }
                            Follow on twitter
                          </button>
                        </div>
                      </>
                    )
                  }
                  
                </div>
                </>
              ) : (
                <>
                  <div className="mx-auto w-fit mt-[32px]">
                    <button onClick={oauthSignin} className="flex h-[36px] default-btn small-btn items-center px-[14px] gap-1 font-Inter text-[14px] text-white rounded-[8px]">
                      {twtIconChange()}
                      Connect twitter
                    </button>
                  </div>
                  <div className="mx-auto w-fit mt-[16px]">
                    <button disabled className={`flex cursor-not-allowed h-[36px] ${mode ? "bg-[#ACC5FF] text-white" : "bg-[#697586] text-[#BDBDBD]"} items-center px-[14px] gap-1 font-Inter text-[14px] text-white rounded-[8px]`}>
                      <Image src="/images/user-follow.svg" height={1} width={20} alt="twitter-svg" />
                      Follow on twitter
                    </button>
                  </div>
                  <p className={`mt-[32px] font-Inter font-[400] text-[14px] ${mode ? "text-black" : "text-[#E3E8EF]"} `}>
                    We would send feature updates to the email address affiliated to your twitter account
                  </p>
                </>
              )}
            </>
          )}
        </div>
      </section>
      <ToastContainer />
      </main>
    </>
  )
}

export default Invite
