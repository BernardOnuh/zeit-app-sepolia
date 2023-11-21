import HeadComp from '@/layout/HeadComp'
import React, { useEffect } from 'react'
import { useData } from "@/context/DataContext"
import Image from 'next/image'

const Terms = () => {
  const {mode, setIsOnApp} = useData()
  useEffect(() => {
    setIsOnApp(false)
  }, [])
  return (
    <>
      <HeadComp title="Zeit | Terms of Use" />
      <section className={`py-[18vh] ${mode ? "bg-white" : "bg-[#1E1E1E]"} transition-[.4s]`}>
          <h2 className={`font-Inter font-[600] md:text-[60px] text-[48px] text-center ${mode ? "text-[#0D121C]" : "text-white"}`}>Terms Of Use</h2>
          <p className={`font-Inter ${mode? "text-[#4F4F4F]" : "text-[#DCDCDC]"} hidden md:block w-fit mx-auto text-[24px] mt-[17px]`}>
              <b className={`font-[600]`}>Last Updated: </b>
              August 29th, 2023
              <Image src={`/images/${mode ? "privacy-icon-w" : "privacy-icon-d"}.svg`} className="translate-x-[70%] translate-y-[-20%]" height={1} width={300} alt="chevron" />
          </p>
          <p className={`font-Inter ${mode? "text-[#4F4F4F]" : "text-[#DCDCDC]"} md:hidden w-fit mx-auto text-[14px] text-center mt-[24px]`}>
              <b className={`font-[600]`}>Last Updated: </b> <br />
              August 29th, 2023
              <Image src={`/images/${mode ? "privacy-icon-w" : "privacy-icon-d"}.svg`} className="translate-x-[40%] translate-y-[-20%]" height={1} width={200} alt="chevron" />
          </p>
          <article className="md:w-[65%] w-[90%] mx-auto">
              <p className={`${mode? "text-[#666]" : "text-[#FCFCFD]"} text-[18px] font-Inter mt-[5vh]`}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend auctor tellus in mattis. Duis dictum pellentesque metus, eget aliquam orci interdum in. Etiam tempor enim at odio vulputate egestas. Aliquam ullamcorper elit gravida, tempor justo eget, convallis lorem. Vivamus feugiat placerat est. Proin placerat pulvinar hendrerit. Nam vitae tempor nibh. Suspendisse pharetra tincidunt lectus, sit amet porta justo finibus pharetra. Sed vel mi non urna malesuada malesuada a tempor lacus. Ut sagittis elit purus, id ullamcorper mauris tincidunt sed. Aenean feugiat ante non dui condimentum pharetra. Nam eu tellus mi. Ut eu ligula non felis congue efficitur. Nam at massa erat.
              </p>
              <h3 className={`${mode ? "text-black" : "text-white"} mt-[32px] text-[24px] font-Inter font-[600]`}>Heading</h3>
              <p className={`${mode? "text-[#666]" : "text-[#FCFCFD]"} text-[18px] font-Inter mt-[16px]`}>
                  Vestibulum libero elit, tempus eget varius eu, tincidunt quis sem. Suspendisse imperdiet efficitur ligula. Sed interdum nibh diam, at pulvinar odio sodales at. Nunc odio nisi, gravida ac lacus ac, sollicitudin congue metus. Etiam pellentesque quis nisi id imperdiet. Vestibulum euismod nibh eget turpis gravida, in sodales est dapibus. Etiam vitae turpis ac neque semper vehicula in eget purus. Phasellus in justo tincidunt augue imperdiet luctus. Maecenas sollicitudin pretium lacus et ullamcorper. Pellentesque eu nisi massa. Nulla eu volutpat enim. Sed finibus interdum volutpat. Phasellus venenatis, nunc suscipit hendrerit pharetra, tortor leo vulputate nisi, eu ullamcorper massa leo molestie lorem. Suspendisse potenti.
              </p>
              <h3 className={`${mode ? "text-black" : "text-white"} mt-[32px] text-[24px] font-Inter font-[600]`}>Sections and Sub sections (Without numbers)</h3>
              <section className="px-[16px]">
                  <h4 className={`${mode ? "text-black" : "text-white"} mt-[16px] text-[20px] font-Inter font-[600]`}>Sub sections</h4>
                  <p className={`${mode? "text-[#666]" : "text-[#FCFCFD]"} text-[18px] font-Inter mt-[16px]`}>
                      Vestibulum libero elit, tempus eget varius eu, tincidunt quis sem. Suspendisse imperdiet efficitur ligula. Sed interdum nibh diam, at pulvinar odio sodales at. Nunc odio nisi, gravida ac lacus ac, sollicitudin congue metus. Etiam pellentesque quis nisi id imperdiet. Vestibulum euismod nibh eget turpis gravida, in sodales est dapibus. Etiam vitae turpis ac neque semper vehicula in eget purus. Phasellus in justo tincidunt augue imperdiet luctus. Maecenas sollicitudin pretium lacus et ullamcorper. Pellentesque eu nisi massa. Nulla eu volutpat enim. Sed finibus interdum volutpat. Phasellus venenatis, nunc suscipit hendrerit pharetra, tortor leo vulputate nisi, eu ullamcorper massa leo molestie lorem. Suspendisse potenti.
                  </p>
                  <h4 className={`${mode ? "text-black" : "text-white"} mt-[16px] text-[20px] font-Inter font-[600]`}>Sub sections</h4>
                  <p className={`${mode? "text-[#666]" : "text-[#FCFCFD]"} text-[18px] font-Inter mt-[16px]`}>
                      Vestibulum libero elit, tempus eget varius eu, tincidunt quis sem. Suspendisse imperdiet efficitur ligula. Sed interdum nibh diam, at pulvinar odio sodales at. Nunc odio nisi, gravida ac lacus ac, sollicitudin congue metus. Etiam pellentesque quis nisi id imperdiet. Vestibulum euismod nibh eget turpis gravida, in sodales est dapibus. Etiam vitae turpis ac neque semper vehicula in eget purus. Phasellus in justo tincidunt augue imperdiet luctus. Maecenas sollicitudin pretium lacus et ullamcorper. Pellentesque eu nisi massa. Nulla eu volutpat enim. Sed finibus interdum volutpat. Phasellus venenatis, nunc suscipit hendrerit pharetra, tortor leo vulputate nisi, eu ullamcorper massa leo molestie lorem. Suspendisse potenti.
                  </p>
              </section>
              <h3 className={`${mode ? "text-black" : "text-white"} mt-[32px] text-[24px] font-Inter font-[600]`}>
                  <span className="pr-[1rem]">1.0</span>
                  Sections and Sub sections (With numbers)
              </h3>
              <p className={`${mode? "text-[#666]" : "text-[#FCFCFD]"} text-[18px] font-Inter mt-[16px]`}>
                  Vestibulum libero elit, tempus eget varius eu, tincidunt quis sem. Suspendisse imperdiet efficitur ligula. Sed interdum nibh diam, at pulvinar odio sodales at. Nunc odio nisi, gravida ac lacus ac, sollicitudin congue metus. Etiam pellentesque quis nisi id imperdiet. Vestibulum euismod nibh eget turpis gravida, in sodales est dapibus. Etiam vitae turpis ac neque semper vehicula in eget purus. Phasellus in justo tincidunt augue imperdiet luctus. Maecenas sollicitudin pretium lacus et ullamcorper. Pellentesque eu nisi massa. Nulla eu volutpat enim. Sed finibus interdum volutpat. Phasellus venenatis, nunc suscipit hendrerit pharetra, tortor leo vulputate nisi, eu ullamcorper massa leo molestie lorem. Suspendisse potenti.
              </p>
              <section className="px-[16px]">
                  <h4 className={`${mode ? "text-black" : "text-white"} mt-[16px] text-[20px] font-Inter font-[600]`}>
                      <span className="pr-[1rem]">1.1</span>
                      Sections and Sub sections
                  </h4>
                  <p className={`${mode? "text-[#666]" : "text-[#FCFCFD]"} text-[18px] font-Inter mt-[16px]`}>
                      Vestibulum libero elit, tempus eget varius eu, tincidunt quis sem. Suspendisse imperdiet efficitur ligula. Sed interdum nibh diam, at pulvinar odio sodales at. Nunc odio nisi, gravida ac lacus ac, sollicitudin congue metus. Etiam pellentesque quis nisi id imperdiet. Vestibulum euismod nibh eget turpis gravida, in sodales est dapibus. Etiam vitae turpis ac neque semper vehicula in eget purus. Phasellus in justo tincidunt augue imperdiet luctus. Maecenas sollicitudin pretium lacus et ullamcorper. Pellentesque eu nisi massa. Nulla eu volutpat enim. Sed finibus interdum volutpat. Phasellus venenatis, nunc suscipit hendrerit pharetra, tortor leo vulputate nisi, eu ullamcorper massa leo molestie lorem. Suspendisse potenti.
                  </p>
                  <h4 className={`${mode ? "text-black" : "text-white"} mt-[16px] text-[20px] font-Inter font-[600]`}>
                      <span className="pr-[1rem]">1.2</span>
                      Sections and Sub sections
                  </h4>
                  <p className={`${mode? "text-[#666]" : "text-[#FCFCFD]"} text-[18px] font-Inter mt-[16px]`}>
                      Vestibulum libero elit, tempus eget varius eu, tincidunt quis sem. Suspendisse imperdiet efficitur ligula. Sed interdum nibh diam, at pulvinar odio sodales at. Nunc odio nisi, gravida ac lacus ac, sollicitudin congue metus. Etiam pellentesque quis nisi id imperdiet. Vestibulum euismod nibh eget turpis gravida, in sodales est dapibus. Etiam vitae turpis ac neque semper vehicula in eget purus. Phasellus in justo tincidunt augue imperdiet luctus. Maecenas sollicitudin pretium lacus et ullamcorper. Pellentesque eu nisi massa. Nulla eu volutpat enim. Sed finibus interdum volutpat. Phasellus venenatis, nunc suscipit hendrerit pharetra, tortor leo vulputate nisi, eu ullamcorper massa leo molestie lorem. Suspendisse potenti.
                  </p>
              </section>
              <h3 className={`${mode ? "text-black" : "text-white"} mt-[32px] text-[24px] font-Inter font-[600]`}>List Sections</h3>
              <ul className={`list-inside list-disc px-[16px] ${mode? "text-[#666]" : "text-[#FCFCFD]"} text-[18px] font-Inter mt-[16px]`}>
                  <li className="">Vestibulum libero elit, tempus eget varius eu, tincidunt quis sem.</li>
                  <li className="">Suspendisse imperdiet efficitur ligula.</li>
              </ul>
          </article>
      </section>
  </>
  )
}

export default Terms
