import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Popup from './components/Popup'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { contractAbiForCrowdFund, contractAddressForCrowdFund, contractAbiForDaoProposals, contractAddressForDaoProposals } from "./abi/contractInstance";
import { ethers } from 'ethers';
import Navbar from './components/Navbar/Navbar';
import Homepage from './Homepage';
import Proposal from './Proposal';

function App() {
  const [popUp, setPopUp] = useState(false);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [showConnectButton, setShowConnectButton] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);
      try {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        setSigner(signer);
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
    }else{
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
    <>
     <Navbar setShowConnectButton={signer} />
      <BrowserRouter>
        <Routes className="App">
          <Route path='/' element={<Homepage />} />
          <Route path='/proposal' element={<Proposal />} />
        </Routes>
      </BrowserRouter>

    </>

  );
}


export default App;
