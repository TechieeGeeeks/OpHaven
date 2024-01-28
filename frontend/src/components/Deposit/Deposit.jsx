import React, { useState } from 'react';

const Deposit = ({ signer, contractBundle }) => {
  const [depositAmount, setDepositAmount] = useState('');

  const depositHandler = async () => {
    try {
      console.log(contractBundle, "Ids here");
      console.log(contractBundle.crowdFundContract); // Check if crowdFundContract is defined
      const tx = await contractBundle.crowdFundContract.deposit(
        depositAmount, { gasLimit: 2000000 }
      );
      await tx.wait();
      console.log("Deposit successful.");
    } catch (error) {
      console.error("Error depositing:", error);
    }
  };

  return (
    <div className='flex flex-col justify-evenly w-[1000px] h-[750px] items-center bg-white backdrop-filter rounded-xl mt-4 backdrop-blur-lg bg-opacity-80 border-b-2 border-black'>
      <h1 className='font-contax text-4xl'>Deposit</h1>
      <div className='flex flex-row justify-between gap-8 items-center'>
        <p className='font-contax text-2xl'>Deposit USDC :</p>
        <input
          type='text'
          className='border border-black rounded-[10px] w-[240px] h-[40px]'
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
          placeholder='Enter Amount'
        />
      </div>
      <button className="inline-block text-lg group mt-4" onClick={depositHandler}>
        <span className="relative z-10 block px-5 py-3 overflow-hidden font-contax font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
          <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
          <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
          <span className="relative">Submit</span>
        </span>
      </button>
    </div>
  );
};

export default Deposit;
