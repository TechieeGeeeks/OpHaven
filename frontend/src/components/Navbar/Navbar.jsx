import React from 'react'

const Navbar = ({signer,contractBundle}) => {

  return (
    <nav className="sticky top-0 z-10 bg-white backdrop-filter w-full backdrop-blur-lg bg-opacity-30 border-b border-gray-200">
    
             <div className="flex items-center justify-around h-16">
             <h1 className='font-contax text-[30px]'>OP.haven</h1>
             <div className="flex space-x-12 text-gray-900">
                 <a className='font-contax' href="#">Dashboard</a>
                 <a className='font-contax' href="#">About</a>
               <a className='font-contax' href="#">Projects</a>
               <a className='font-contax' href="#">Contact</a>
             </div>
             {
              signer?
               (<button className='pt-2 pb-2 pl-6 pr-6 text-white font-contax bg-black '>Wallet Conencted</button>):
               (<button className='pt-2 pb-2 pl-6 pr-6 text-white font-contax bg-black ' >Connect Wallet</button>)
             }
           

            </div>
    </nav>
  )
}

export default Navbar