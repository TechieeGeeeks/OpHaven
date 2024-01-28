import React from 'react'
import Button from '../Button'
const Main = () => {
  return (
    <div className='flex flex-col  justify-center items-center'>
     <img className='mt-5' src='/Op.png' width={'400px'} alt='Op' />
     <h1 className='font-contax text-[100px]'>Haven</h1>
     <p className='font-contax text-[#4a4a4ab2]'>najjnjanjfkjajknfkjafnakjfkjajfjanjfjakjnfkja</p>
     <div className='flex flex-row justify-center items-center gap-8 mt-8'>
      <Button text={'Donate'} link={'/donate'} />
      <Button text={'Make A Proposal'} link={'/proposal'} />
     </div>

    </div>
  )
}

export default Main