import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import ProposalForm from './components/CreateProposal/CreatePropsal'
import CreatePropsal from './components/CreateProposal/CreatePropsal';
import ProposalVoting from './components/ProposalVoting.jsx/ProposalVoting';

const Proposal = ({signer,contractBundle}) => {
  console.log('proposal',contractBundle)
  return (
    <div className='flex items-center flex-col gap-8 mt-4 justify-center h-screen'>
      <CreatePropsal contractBundle={contractBundle}  className="w-[600px] h-[400px]"/>
      <ProposalVoting contractBundle={contractBundle} className="w-[600px] h-[400px]"/>
    </div>
  );
};

export default Proposal;
