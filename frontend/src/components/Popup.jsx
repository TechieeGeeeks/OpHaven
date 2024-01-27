import React from 'react'

const Popup = () => {
  return (
    <div className='w-[1000px] h-[500px] bg-white'> 
       <div className=' h-[60px]'>
            <button className='p-4 bg-black text-white'>
                Donate
            </button>
            <button className='p-4 bg-black text-white'>
                Approved Vendors 
            </button>
            <button className='p-4 bg-black text-white'>
                Distribute
            </button>
       </div>
       <div className='flex justify-center flex-column items-center'>
        <h1>Donation Amount</h1>
        <input type='text' placeholder='Enter Amount'/>
        <button className='p-4 bg-black text-white'>Donate</button>
       </div>
    </div>
  )
}

export default Popup