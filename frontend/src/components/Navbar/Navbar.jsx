import React from 'react'

const Navbar = ({ signer, contractBundle, address }) => {


  return (
    <nav className="sticky top-0 z-10 bg-white backdrop-filter rounded-xl mt-4 backdrop-blur-lg bg-opacity-30 border-b-2 border-black">

      <div className="flex items-center justify-around h-16">
        <h1 className='font-contax text-[30px]'>OP.haven</h1>
        <div className="flex space-x-12 text-gray-900">
          <a className='font-contax' href="/donate">Donate</a>
          <a className='font-contax' href="/proposal">Make Proposal</a>
          
        </div>
        {
          address ? (
            <button className='pt-2 pb-2 pl-6 pr-6 text-ellipsis text-white font-contax rounded-[20px] bg-black '>
              {address.substring(0, 12)}...
            </button>
          ) : (
            <button className='pt-2 pb-2 pl-6 pr-6 text-white font-contax rounded-[20px] bg-black'>
              Connect Wallet
            </button>
          )
        }



      </div>
    </nav>
  )
}

export default Navbar