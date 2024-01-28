import React from 'react'
import Button from '../Button'
const Main = () => {
  return (
    <div className='flex flex-col  justify-center items-center'>
      <img className='mt-8 floating-avatar' src='/Op.png' width={'400px'} alt='Op' />
      <h1 className='font-contax text-[120px]'>Haven</h1>
      <p className='font-contax w-[1300px] text-center text-[#00000080]'>
  Welcome to the First Stable Fund Distribution platform on Optimism. We're transforming Crowdfunding, providing a secure space for Innovative projects. Join us for Decentralized and Transparent Fundraising. Empower your ideas, Join the Movement, and experience Trustless Fundraising with Optimism.
</p>

      <div className='flex flex-row justify-center items-center gap-8 mt-8'>
        <Button text={'Donate'} link={'/donate'} />
        <Button text={'Make A Proposal'} link={'/proposal'} />
      </div>

    </div>
  )
}

export default Main