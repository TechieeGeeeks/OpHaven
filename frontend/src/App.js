import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Popup from './components/Popup'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { contractAbiForCrowdFund,
         contractAddressForCrowdFund, 
         contractAbiForDaoProposals, 
         contractAddressForDaoProposals, 
         contractAddressForTestUSDC, 
         contractAbiForTestUsdc, 
         contractAddressForVotingToken, 
         contractAbiForVotingToken } from "./abi/contractInstance";
import { ethers } from 'ethers';
import Navbar from './components/Navbar/Navbar';
import Homepage from './Homepage';
import Proposal from './Proposal.jsx';
import Donate from './Donate';
import TokenApproval from './components/TokenApproval/TokenApproval.jsx';
import DistributeAndBatchDistribution from './components/distribution/distributeAndBatchDistribution.jsx';

function App() {
  const [popUp, setPopUp] = useState(false);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [showConnectButton, setShowConnectButton] = useState(false);
  const [contractBundle, setContractBundle] = useState({}); 
  const [address,setAddress] = useState(null)

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);
      try {
        
        const optimismTestnetParams = {
          chainId: '0xaa37dc', 
          chainName: 'OP Sepolia',
          nativeCurrency: {
            name: 'Ethereum',
            symbol: 'ETH', 
            decimals: 18,
          },
          rpcUrls: ['https://sepolia.optimism.io/'],
          blockExplorerUrls: ['https://sepolia-optimistic.etherscan.io/'],
        };
  
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: optimismTestnetParams.chainId }], // chainId must be in hexadecimal numbers
          });
        } catch (switchError) {
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [optimismTestnetParams],
              });
            } catch (addError) {
              console.error(addError);
            }
          }
          console.error(switchError);
        }
  
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        setSigner(signer);
        const address = await signer.getAddress();
        setAddress(address);
        await connectContract(signer);
      } catch (error) {
        console.error(error);
        setShowConnectButton(true);
      }
    } else {
      setShowConnectButton(true);
    }
  };

  const connectContract = async (signer) => {
    if (signer) {
      const crowdFundContract = new ethers.Contract(contractAddressForCrowdFund, contractAbiForCrowdFund, signer);
      const daoProposalsContract = new ethers.Contract(contractAddressForDaoProposals, contractAbiForDaoProposals, signer);
      const testUsdcContract =new ethers.Contract(contractAddressForTestUSDC , contractAbiForTestUsdc, signer);
      const votingTokenContract = new ethers.Contract(contractAddressForVotingToken, contractAbiForVotingToken, signer);
      setContractBundle({
        crowdFundContract : crowdFundContract,
        daoProposalsContract:daoProposalsContract,
        testUsdcContract: testUsdcContract,
        votingTokenContract: votingTokenContract
      })
      console.log(crowdFundContract.address, votingTokenContract.address, testUsdcContract.address, daoProposalsContract.address, daoProposalsContract.addres0s)
;    } else {
      window.location.reload();
    }

  }



  useEffect(() => {
    if (window.ethereum) {
      connectWallet();
    } else {
      setShowConnectButton(true);
    }

  }, [])
  return (
    <div className="px-8 md:px-16">
      <Navbar address={address} />
      {provider ? (
        <div className='flex items-center flex-col gap-8 mt-4 justify-center h-screen'>
        <Routes>
          <Route path='/' element={<Homepage />} />
        <Route path="/donate" element={<Donate signer={signer} contractBundle={contractBundle}   />} />
          <Route path="/proposal" element={<Proposal signer={signer} contractBundle={contractBundle} />} />
          <Route path="/approval" element={<TokenApproval signer={signer} contractBundle={contractBundle} />} />
          <Route path="/distribute" element={<DistributeAndBatchDistribution signer={signer} contractBundle={contractBundle} />} />
        </Routes>
      {/* ) : (    */}
          {showConnectButton ? (
            <div>
             
            </div>
          ) : null}
        </div>
      ) : null}   
    </div>
  );
}


export default App;
