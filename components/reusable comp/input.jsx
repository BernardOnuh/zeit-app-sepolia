import React from 'react'



const Input = ({inputRef, tokenAmount, changeAmount}) => {
  return (
    <div className="my-[8px] bg-[#F8FAFC] rounded-[8px] p-[8px] flex justify-between items-center">
        <button className="py-[2px] px-[8px] rounded-[8px] text-[#697586] text-[14px] font-[400] font-Inter">
            MAX
        </button>
        <div className="">
            <input
                ref={inputRef}
                type="number"
                name="firstTokenAmount"
                value={tokenAmount}
                onChange={changeAmount}
                className="text-[#9AA4B2] h-[30px] font-Inter text-[20px] w-[57px] bg-transparent outline-none font-[500]"
                placeholder="0.000"
            />
            <p className="text-[#9AA4B2] text-[14px] font-[400] font-Inter text-right">
            $0.00
            </p>
        </div>
    </div>
  )
}

export default Input