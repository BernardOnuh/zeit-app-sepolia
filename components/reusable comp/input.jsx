import React,{useEffect} from 'react';
import { useAccount, useBalance } from 'wagmi';

function TokenComponent({ token }) {
  const { data: tokenData, error: tokenError, isLoading: tokenIsLoading } = useBalance({
    address: useAccount().address,
    token: token,
  });

  if (tokenIsLoading) {
    return <div>Loading...</div>;
  }

  if (tokenError) {
    return <div>Error: {tokenError.message}</div>;
  }

  // Check if tokenData is defined before accessing its properties
  if (!tokenData) {
    return <div>No data available</div>;
  }

  return (
    <div>
      {tokenData.formatted}
    </div>
  );
}


const Input = ({ inputRef, tokenAddress,tokenBalance, tokenAmount, changeAmount, setMaxAmount,setBalance, inputName }) => {
  const { address } = useAccount();
  const { data: tokenData } = useBalance({
    address: address,
    token: tokenAddress,
  });

  useEffect((value) => {
    if (tokenData && tokenData.formatted) {
      setBalance(tokenData.formatted, inputName); // Assuming inputName is the name you want to use
    }
  }, [tokenData]); 

  const handlePercentageClick = (value) => {
    if (tokenData && tokenData.formatted) {
      switch(value) {
        case 25:
          setMaxAmount(tokenData.formatted*0.25, inputName);
          break
        case 50:
          setMaxAmount(tokenData.formatted*0.5, inputName);
          break
        case 75:
          setMaxAmount(tokenData.formatted*0.75, inputName);
          break
        default:
        setMaxAmount(tokenData.formatted, inputName);
      }
    }
  };

  return (
    <>
      <div className="my-[8px] bg-[#F8FAFC] rounded-[8px] p-[8px] flex justify-between items-center">
        {inputName == "firstTokenAmount" ? 
          (
            <button onClick={handlePercentageClick} className="py-[2px] px-[8px] rounded-[8px] text-[#697586] text-[14px] font-[400] font-Inter">
              MAX
            </button>
          ): <div></div>
        }
        <div className="">
          <input
            ref={inputRef}
            type="number"
            name= {inputName}
            value={tokenAmount}
            onChange={changeAmount}
            className="text-[#9AA4B2] h-[30px] font-Inter text-[20px] text-right min-w-[57px] bg-transparent outline-none font-[500]"
            placeholder="0.000"
          />
          <p className="text-[#9AA4B2] text-[14px] font-[400] font-Inter text-right">
            <TokenComponent token={tokenAddress} />
          </p>
        </div>
      </div>
      {inputName == "firstTokenAmount" ? 
        (
          <div className="h-[28px] flex justify-between mb-[8px]">
            <button onClick={() => handlePercentageClick(25)} className="l-trans-btn small-btn">25%</button>
            <button onClick={() => handlePercentageClick(50)} className="l-trans-btn small-btn">50%</button>
            <button onClick={() => handlePercentageClick(75)} className="l-trans-btn small-btn">75%</button>
            <button onClick={handlePercentageClick} className="l-trans-btn small-btn">100%</button>
          </div>
        ):
        null
      }
    </>
  );
};

export default Input;
