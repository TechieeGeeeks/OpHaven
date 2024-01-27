import React from 'react'

const Navabr = () => {
  return (
    <nav className="sticky top-0 z-10 bg-white backdrop-filter backdrop-blur-lg bg-opacity-30 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
            <span className="text-2xl text-gray-900 font-semibold">Logo</span>
            <div className="flex space-x-4 text-gray-900">
                <a className='font-contax' href="#">Dashboard</a>
                <a className='font-contax' href="#">About</a>
                <a className='font-contax' href="#">Projects</a>
                <a className='font-contax' href="#">Contact</a>
            </div>
            </div>
        </div>
    </nav>
  )
}

export default Navabr