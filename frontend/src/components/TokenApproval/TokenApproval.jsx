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
      <div className="flex flex-col justify-evenly w-[1000px] h-[750px] bg-white rounded-[20px] items-center border-black">
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
        <button
          className="inline-block text-lg group"
          onClick={approvalHandlerForUsdc}
        >
          {/* Button styling */}
          <span className="relative">Approve USDC</span>
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
        <button
          className="inline-block text-lg group"
          onClick={approvalHandlerForVotingToken}
        >
          {/* Button styling */}
          <span className="relative">Approve VotingToken</span>
        </button>
      </div>
    </>
  );
};

export default TokenApproval;
