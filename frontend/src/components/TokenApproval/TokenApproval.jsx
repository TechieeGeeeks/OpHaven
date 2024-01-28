import React, { useState } from "react";

const TokenApproval = ({ signer, contractBundle }) => {
  const [spenderAddressForUsdc, setSpenderAddressForUsdc] = useState('');
  const [tokenApprovalAmountForUsdc, setTokenApprovalAmountForUsdc] = useState('');

  const [spenderAddressForVotingToken, setSpenderAddressForVotingToken] = useState('');
  const [tokenApprovalAmountForVotingToken, setTokenApprovalAmountForVotingToken] = useState('');

  const approvalHandlerForUsdc = async () => {
    try {
      const tx = await contractBundle.testUsdcContract.approve(
        spenderAddressForUsdc, 
        tokenApprovalAmountForUsdc
      );
      await tx.wait();
      console.log("Approval successful for USDC.");
    } catch (error) {
      console.error("Error in USDC approval:", error);
    }
  };

  const approvalHandlerForVotingToken = async () => {
    try {
      const tx = await contractBundle.votingTokenContract.approve(
        spenderAddressForVotingToken, 
        tokenApprovalAmountForVotingToken
      );
      await tx.wait();
      console.log("Approval successful for VotingToken.");
    } catch (error) {
      console.error("Error in VotingToken approval:", error);
    }
  };

  return (
    <>
      {/* USDC Approval UI */}
      <div className="flex flex-col justify-evenly w-[1000px] h-[750px] items-center bg-white backdrop-filter rounded-xl mt-4 backdrop-blur-lg bg-opacity-80 border-b-2 border-black">
        <h1 className="font-contax text-4xl">Approve tUsdc</h1>
        <div className="flex flex-row justify-between gap-8">
          <p className="font-contax text-2xl">Spender Address:</p>
          <input
            type="text"
            className="border border-black rounded-[10px] w-[240px] h-[40px]"
            value={spenderAddressForUsdc}
            onChange={(e) => setSpenderAddressForUsdc(e.target.value)}
            placeholder="Enter Spender Address"
          />
        </div>
        <div className="flex flex-row justify-between gap-8">
          <p className="font-contax text-2xl">Amount:</p>
          <input
            type="text"
            className="border border-black rounded-[10px] w-[240px] h-[40px]"
            value={tokenApprovalAmountForUsdc}
            onChange={(e) => setTokenApprovalAmountForUsdc(e.target.value)}
            placeholder="Enter Amount"
          />
        </div>
        <button   onClick={approvalHandlerForUsdc}  className="inline-block text-lg group">
      <span className="relative z-10 block px-5 py-3 overflow-hidden font-contax font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
        <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
        <span className="absolute left-0 w-[400px] h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
        <span className="relative">Approve USDC</span>
      </span>

    </button>
        
      </div>

      {/* VotingToken Approval UI */}
      <div className="flex flex-col justify-evenly w-[1000px] h-[750px] bg-white rounded-[20px] items-center border-black">
        <h1 className="font-contax text-4xl">Approve VotingToken</h1>
        <div className="flex flex-row justify-between gap-8">
          <p className="font-contax text-2xl">Spender Address:</p>
          <input
            type="text"
            className="border border-black rounded-[10px] w-[240px] h-[40px]"
            value={spenderAddressForVotingToken}
            onChange={(e) => setSpenderAddressForVotingToken(e.target.value)}
            placeholder="Enter Spender Address"
          />
        </div>
        <div className="flex flex-row justify-between gap-8">
          <p className="font-contax text-2xl">Amount:</p>
          <input
            type="text"
            className="border border-black rounded-[10px] w-[240px] h-[40px]"
            value={tokenApprovalAmountForVotingToken}
            onChange={(e) => setTokenApprovalAmountForVotingToken(e.target.value)}
            placeholder="Enter Amount"
          />
        </div>
        <button onClick={approvalHandlerForVotingToken}  className="inline-block text-lg group">
      <span className="relative z-10 block px-5 py-3 overflow-hidden font-contax font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
        <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
        <span className="absolute left-0 w-[400px] h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
        <span className="relative">Approve Voting Token</span>
      </span>

    </button>
        
      </div>
    </>
  );
};

export default TokenApproval;
