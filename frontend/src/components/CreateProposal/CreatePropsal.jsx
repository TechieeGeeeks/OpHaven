import React, { useEffect, useState } from 'react';

const CreateProposal = ({signer, contractBundle }) => {
  const [proposalName, setProposalName] = useState('');
  const [proposalDescription, setProposalDescription] = useState('');
  const [duration, setDuration] = useState('');

  const createAProposal = async () => {
    try {
      console.log(contractBundle, "Ids herer");
      console.log(contractBundle.daoProposalsContract); // Check if daoProposalsContract is defined
      const tx = await contractBundle.daoProposalsContract.makeProposal(
        proposalDescription,
        parseInt(duration, 10)
      );
      await tx.wait();
      console.log("Proposal created successfully.");
    } catch (error) {
      console.error("Error creating the proposal:", error);
    }
  };


  return (
    <div className='flex flex-col justify-evenly w-[1000px] h-[750px] gap-10 items-center bg-white backdrop-filter rounded-xl mt-[380px] backdrop-blur-lg bg-opacity-80 border-b-2 border-black'>
      <h1 className='font-contax text-4xl'>Proposal Details</h1>
      <div className='flex flex-row justify-start gap-8'>
        <p className='font-contax text-2xl text-center items-center'>Proposal Name:</p>
        <input
          type='text'
          className='border border-black rounded-[10px] w-[240px] h-[40px]'
          value={proposalName}
          onChange={(e) => setProposalName(e.target.value)}
          placeholder='Enter Proposal Name'
        />
      </div>
      <div className='flex flex-row justify-between gap-8'>
        <p className='font-contax text-2xl text-center items-center'>Proposal Description:</p>
        <input
          type='text'
          className='border border-black rounded-[10px] w-[240px] h-[40px]'
          value={proposalDescription}
          onChange={(e) => setProposalDescription(e.target.value)}
          placeholder='Enter Proposal Description'
        />
      </div>
      <div className='flex flex-row justify-between gap-8'>
        <p className='font-contax text-2xl text-center items-center'>Proposal Duration:</p>
        <input
          type='text'
          className='border border-black rounded-[10px] w-[240px] h-[40px]'
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder='Enter Proposal Duration'
        />
      </div>
      <button className="inline-block text-lg group pb-6" onClick={createAProposal}>
        <span className="relative z-10 block px-5 py-3 overflow-hidden font-contax font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
          <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
          <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
          <span className="relative">Submit</span>
        </span>
      </button>
    </div>
  );
};

export default CreateProposal;
