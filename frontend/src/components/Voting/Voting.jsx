
import React, { useState } from 'react';

const Voting = ({signer, contractBundle }) => {
  const [account, setAccount] = useState('');
  const [votingPower, setVotingPower] = useState('');

  const checkVotingPower = async () => {
    try {
      // Ensure that contractBundle.votingTokenContract is defined
      if (!contractBundle.votingTokenContract) {
        console.error("VotingTokenContract is not defined in contractBundle.");
        return;
      }

      // Use the signer from your contractBundle to get the address
      const signerAddress = await signer.getAddress();
      console.log(signerAddress);

      const power = await contractBundle.votingTokenContract.balanceOf(signerAddress);

      setVotingPower(power.toString());
      console.log("Voting power checked successfully.");
    } catch (error) {
      console.error("Error checking voting power:", error);
    }
  };

  return (
    <div className='flex flex-col justify-evenly w-[1000px] h-[750px] mb-4 items-center bg-white backdrop-filter rounded-xl mt-4 backdrop-blur-lg bg-opacity-80 border-b-2 border-black'>
      <h1 className='font-contax text-4xl'>Check Voting Power</h1>

      <button className="inline-block text-lg group" onClick={checkVotingPower}>
        <span className="relative z-10 block px-5 py-3 overflow-hidden font-contax font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
          <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
          <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
          <span className="relative">Check Power</span>
        </span>
      </button>
      {votingPower && (
        <p className='font-contax text-2xl'>Voting Power: {votingPower}</p>
      )}
    </div>
  );
}

export default Voting;
