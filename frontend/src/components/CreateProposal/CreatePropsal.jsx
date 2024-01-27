import React, { useState } from 'react';
import { ethers } from 'ethers';

const CreateProposal = ({ contract,account}) => {
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');

  const handleProposalSubmission = ()=>{
    
  }

  return (
    <main className='flex items-center justify-center p-4'>
      <div className='absolute inset-0 w-[800px] p-4 h-[600px] rounded-lg mx-auto my-auto border-2 border-black bg-white'>
        <div className='flex flex-col justify-center items-center mt-4'>
          <p className='font-contax text-[30px]'>Create Proposal</p>
          <div className='flex flex-col justify-center text-center items-center'>
            <div className='flex flex-row justify-between items-center'>
              <p className='font-contax text-[18px] mr-4'>Proposal Title</p>
              <input
                type="text"
                className='w-[300px] h-[40px] border border-[#3e3e3e54] rounded-lg p-2 ml-4'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Enter Proposal Description:'
              />
            </div>
            <div className='flex flex-row justify-between items-center mt-4'>
              <p className='font-contax text-[18px] bg-[#3333336d] rounded-md p-2 mr-4'>Duration (in days)</p>
              <input
                type="number"
                className='w-[300px] h-[40px] border border-[#3e3e3e54] rounded-lg p-2 ml-4'
                value={duration}
                
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
          </div>
          <button
            className='mt-4 bg-black text-white pt-2 pb-2 pl-6 pr-6 rounded-lg  cursor-pointer'
            onClick={handleProposalSubmission}
          >
            Submit Proposal
          </button>
        </div>
      </div>
    </main>
  );
};

export default CreateProposal;
