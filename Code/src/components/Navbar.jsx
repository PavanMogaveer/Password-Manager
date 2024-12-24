import React from 'react'

function Navbar() {
  return (
    <nav className='bg-blue-950 py-1 '>
        <div className="logo flex justify-center text-4xl text-white font-bold"><span className='text-orange-500'>&lt;</span>Pass-<span className='text-orange-500'>Guard/&gt;</span></div>
        <ul className='flex justify-center gap-7 text-white my-1'>
         <li className='hover:font-bold'><a href="/">Home</a></li>
         <li className='hover:font-bold'><a href="#">About</a></li>
         <li className='hover:font-bold'><a href="#">Contact</a></li>
        </ul>
    </nav>
  )
}

export default Navbar
