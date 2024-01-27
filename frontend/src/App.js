import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Popup from './components/Popup'

function App() {
  const [popUp ,setPopUp] = useState(false);

  const togglePopUp = () => {
    setPopUp(true);
  }
  return (
    <div >
      <nav className="sticky top-0 z-10 bg-white backdrop-filter backdrop-blur-lg bg-opacity-30 border-b border-gray-200">
    
            <div className="flex items-center justify-around h-16">
            <h1 className='font-contax text-[30px]'>DAO</h1>
            <div className="flex space-x-4 text-gray-900">
                <a className='font-contax' href="#">Dashboard</a>
                <a className='font-contax' href="#">About</a>
                <a className='font-contax' href="#">Projects</a>
                <a className='font-contax' href="#">Contact</a>
            </div>
            <button onClick={togglePopUp} className='pt-2 pb-2 pl-6 pr-6 text-white font-contax bg-black '>Connect Wallet</button>

            </div>
            
       
    </nav>
    {popUp&&
    <div className='flex justify-center text-center mt-36 bg-white h-[400px]'  >
      <Popup />
      </div>
    
    }
      
    </div>
  );
}

export default App;
