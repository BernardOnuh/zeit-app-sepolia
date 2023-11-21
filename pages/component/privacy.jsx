import HeadComp from "@/layout/HeadComp";
import React from "react";
import { useData } from "@/context/DataContext";
import Image from "next/image";

const Privacy = () => {
  const {mode, setIsOnApp} = useData()
  useEffect(() => {
    setIsOnApp(false)
  }, [])
  return (
    <>
      <HeadComp title="Zeit | Privacy Policy" />
      <section
        className={`py-[18vh] ${
          mode ? "bg-white" : "bg-[#1E1E1E]"
        } transition-[.4s]`}
      >
        <h2
          className={`font-Inter font-[600] md:text-[60px] text-[48px] text-center ${
            mode ? "text-[#0D121C]" : "text-white"
          }`}
        >
          Privacy Policy
        </h2>
        <p
          className={`font-Inter ${
            mode ? "text-[#4F4F4F]" : "text-[#DCDCDC]"
          } hidden md:block w-fit mx-auto text-[24px] mt-[17px]`}
        >
          <b className={`font-[600]`}>Last Updated: </b>
          Nov 19th, 2023
          <Image
            src={`/images/${mode ? "privacy-icon-w" : "privacy-icon-d"}.svg`}
            className="translate-x-[70%] translate-y-[-20%]"
            height={1}
            width={300}
            alt="chevron"
          />
        </p>
        <p
          className={`font-Inter ${
            mode ? "text-[#4F4F4F]" : "text-[#DCDCDC]"
          } md:hidden w-fit mx-auto text-[14px] text-center mt-[24px]`}
        >
          <b className={`font-[600]`}>Last Updated: </b> <br />
          August 29th, 2023
          <Image
            src={`/images/${mode ? "privacy-icon-w" : "privacy-icon-d"}.svg`}
            className="translate-x-[40%] translate-y-[-20%]"
            height={1}
            width={200}
            alt="chevron"
          />
        </p>
        <article className="md:w-[65%] w-[90%] mx-auto">
          <p
            className={`${
              mode ? "text-[#666]" : "text-[#FCFCFD]"
            } text-[18px] font-Inter mt-[5vh]`}
          >
            Thank you for using Zeit This Privacy Policy outlines how we
            collect, use, and protect your personal information. By accessing or
            using zeit, you agree to the terms of this Privacy Policy.
          </p>
          <h3
            className={`${
              mode ? "text-black" : "text-white"
            } mt-[32px] text-[24px] font-Inter font-[600]`}
          >
            1. Information We Collect:
          </h3>
          <p
            className={`${
              mode ? "text-[#666]" : "text-[#FCFCFD]"
            } text-[18px] font-Inter mt-[16px]`}
          >
            1.1. Personal Information: We may collect personal information, such
            as your name, email address, and contact details when you register
            an account with Zeit.
          </p>
          <h3
            className={`${
              mode ? "text-black" : "text-white"
            } mt-[32px] text-[24px] font-Inter font-[600]`}
          >
            Sections and Sub sections (Without numbers)
          </h3>
          <section className="px-[16px]">
            <h4
              className={`${
                mode ? "text-black" : "text-white"
              } mt-[16px] text-[20px] font-Inter font-[600]`}
            >
              Sub sections
            </h4>
            <p
              className={`${
                mode ? "text-[#666]" : "text-[#FCFCFD]"
              } text-[18px] font-Inter mt-[16px]`}
            >
              1.2. Transaction Information: We collect information related to
              your transactions on [Your Perpetual Dex Name], including
              transaction history, wallet addresses, and other details necessary
              for transaction processing.
            </p>
            <h4
              className={`${
                mode ? "text-black" : "text-white"
              } mt-[16px] text-[20px] font-Inter font-[600]`}
            >
              2. How We Use Your Information:
            </h4>
            <p
              className={`${
                mode ? "text-[#666]" : "text-[#FCFCFD]"
              } text-[18px] font-Inter mt-[16px]`}
            ></p>
          </section>
          <h3
            className={`${
              mode ? "text-black" : "text-white"
            } mt-[32px] text-[24px] font-Inter font-[600]`}
          >
            <span className="pr-[1rem]"></span>
            2. How We Use Your Information:
          </h3>
          <p
            className={`${
              mode ? "text-[#666]" : "text-[#FCFCFD]"
            } text-[18px] font-Inter mt-[16px]`}
          >
            2.1. To Provide Services: We use your personal information to
            provide and improve our services, authenticate users, and process
            transactions on Zeit.
          </p>
          <section className="px-[16px]">
            <h4
              className={`${
                mode ? "text-black" : "text-white"
              } mt-[16px] text-[20px] font-Inter font-[600]`}
            >
              <span className="pr-[1rem]">1.1</span>
              Sections and Sub sections
            </h4>
            <p
              className={`${
                mode ? "text-[#666]" : "text-[#FCFCFD]"
              } text-[18px] font-Inter mt-[16px]`}
            >
              2.2. Communication: We may use your contact information to send
              you important updates, announcements, and marketing materials
              related to Zeit.
            </p>
            <h4
              className={`${
                mode ? "text-black" : "text-white"
              } mt-[16px] text-[20px] font-Inter font-[600]`}
            >
              <span className="pr-[1rem]"></span>
              3. Information Sharing:
            </h4>
            <p
              className={`${
                mode ? "text-[#666]" : "text-[#FCFCFD]"
              } text-[18px] font-Inter mt-[16px]`}
            >
              3.1. Third Parties: We may share your information with third-party
              service providers who assist us in operating Zeit and delivering
              services to you. These third parties are obligated to maintain the
              confidentiality of your information.
            </p>
          </section>
          <h3
            className={`${
              mode ? "text-black" : "text-white"
            } mt-[32px] text-[24px] font-Inter font-[600]`}
          >
            3.2. Legal Compliance: We may disclose your information if required
            by law or in response to a valid legal request.
          </h3>
          <ul
            className={`list-inside list-disc px-[16px] ${
              mode ? "text-[#666]" : "text-[#FCFCFD]"
            } text-[18px] font-Inter mt-[16px]`}
          >
            <li className="">
              4. Security: We take reasonable measures to protect your personal
              information from unauthorized access, disclosure, alteration, and
              destruction. However, no method of transmission over the internet
              or electronic storage is 100% secure, and we cannot guarantee
              absolute security
            </li>
            <li className="">
               Contact Us: If you have any questions or concerns about this
              Privacy Policy, please contact us at our twitter handle.
            </li>
          </ul>
        </article>
      </section>
    </>
  );
};

export default Privacy;
