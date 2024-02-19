import React, { useState } from 'react';
import { MdCheck, MdClose } from 'react-icons/md';

const ProposalVoting = ({ contractBundle }) => {
  const [proposalId, setProposalId] = useState('');
  const [userVotes, setUserVotes] = useState('');
  console.log(contractBundle)

  const voteForProposal = async () => {
    try {
      // Ensure that contractBundle.daoProposalContract is defined
      

      // Ensure that proposalId and userVotes are valid
      if (!proposalId || !userVotes) {
        console.error("Invalid proposalId or userVotes");
        return;
      }
      console.log(proposalId, userVotes)

      await contractBundle.daoProposalsContract.castVote(proposalId, userVotes, { gasLimit: 2000000 });
      console.log("Vote casted successfully.");
    } catch (error) {
      console.error("Error casting vote:", error);
    }
  };

  return (
    <>
    <div className='flex flex-col justify-evenly w-[1000px] h-[750px] items-center mb-4 bg-white backdrop-filter rounded-xl mt-4 backdrop-blur-lg bg-opacity-80 border-b-2 border-black'>
      
      <h1 className='font-contax text-4xl'>Vote on Existing Proposal</h1>
      
      {/* Proposal 1 */}
      <div className='flex flex-col justify-evenly w-[800px] h-[150px] bg-gray-200 rounded-[10px] items-center border-black my-4'>
        <p className='font-contax text-2xl text-center items-center'>Proposal Name: Proposal 1</p>
        <p className='font-contax text-2xl text-center items-center'>Proposers Address: Proposal 1</p>
        <p className='font-contax text-2xl text-center items-center'>Proposal Description: Description 1</p>
        <p className='font-contax text-2xl text-center items-center'>Proposal Duration: 7 days</p>

        
      </div>
     

    
    </div>
      {/* Proposal Voting Section */}
      <div className='flex flex-col justify-evenly w-[1000px] h-[750px] items-center mb-4 bg-white backdrop-filter rounded-xl mt-4 backdrop-blur-lg bg-opacity-80 border-b-2 p-4 gap-6 border-black'>
        <p className='font-contax text-2xl text-center items-center'>Vote for Proposal</p>
        <input
          type="text"
          placeholder="Enter Proposal ID"
          value={proposalId}
          className='border border-black rounded-[10px] w-[240px] h-[40px]'
          onChange={(e) => setProposalId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Votes"
          className='border border-black rounded-[10px] w-[240px] h-[40px]'
          value={userVotes}
          onChange={(e) => setUserVotes(e.target.value)}
        />
        <button onClick={voteForProposal}  className="inline-block text-lg group">
      <span className="relative z-10 block px-5 py-3 overflow-hidden font-contax font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
        <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
        <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
        <span className="relative">Cast Vote</span>
      </span>

    </button>
      </div>

      {/* Successful Proposals Section */}
      <div className='flex flex-col justify-evenly w-[1000px] min-h-[200px] items-center mb-8 bg-white backdrop-filter rounded-xl mt-4  backdrop-blur-lg bg-opacity-80 border-b-2 border-black'>
        <p className='font-contax text-2xl text-center items-center'>Successful Proposals</p>
        {/* Display successful proposals here */}
      </div>
      </>
  );
};

export default ProposalVoting;
