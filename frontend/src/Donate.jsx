import React from 'react'
import Deposit from './components/Deposit/Deposit'
import Voting from './components/Voting/Voting'

const Donate = ({signer,contractBundle}) => {
  return (
    <div className='flex items-center flex-col gap-8 mt-4 justify-center h-screen'>
        <Deposit contractBundle={contractBundle} signer={signer}  className="w-[600px] h-[400px]"
        />
        <Voting contractBundle={contractBundle} signer={signer} className="w-[600px] h-[400px]"
        />
    </div>
  )
}

export default Donate