import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import ProposalForm from './components/CreateProposal/CreatePropsal'

const Proposal = () => {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  return (
    <div>
      
      {contract && account && <ProposalForm contract={contract} account={account} />}
    </div>
  );
};

export default Proposal;
