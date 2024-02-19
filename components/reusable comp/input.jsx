import React from 'react';
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


const Input = ({ inputRef, tokenAddress, tokenAmount, changeAmount, setMaxAmount }) => {
  const { address } = useAccount();
  const { data: tokenData } = useBalance({
    address: address,
    token: tokenAddress,
  });

  const handleMaxClick = () => {
    if (tokenData && tokenData.formatted) {
      changeAmount(tokenData.formatted);
    }
  };

  return (
    <div className="my-[8px] bg-[#F8FAFC] rounded-[8px] p-[8px] flex justify-between items-center">
      <button onClick={handleMaxClick} className="py-[2px] px-[8px] rounded-[8px] text-[#697586] text-[14px] font-[400] font-Inter">
        MAX
      </button>
      <div className="">
        <input
          ref={inputRef}
          type="number"
          name={tokenAmount}
          value={tokenAmount}
          onChange={changeAmount}
          className="text-[#9AA4B2] h-[30px] font-Inter text-[20px] w-[57px] bg-transparent outline-none font-[500]"
          placeholder="0.000"
        />
        <p className="text-[#9AA4B2] text-[14px] font-[400] font-Inter text-right">
          <TokenComponent token={tokenAddress} />
        </p>
      </div>
    </div>
  );
};

export default Input;
