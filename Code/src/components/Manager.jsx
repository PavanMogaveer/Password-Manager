import React from 'react'

function Manager() {
  return (
    <>
<div class="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
   <div className="container flex  py-2 flex-col items-center justify-center">
    <span className='text-center text-blue-500 font-semibold my-1'>Your Own Password Manager</span>
    
    <input type="text" name="" id=""  className= ' border border-blue-300 px-3 py-1 w-3/4 rounded-full  '/>
   

    <div className='my-1  flex w-3/4 gap-2 m-auto'>
    <input type="text" name="" id=""  className= ' border border-blue-300 px-3 py-1 w-1/2 rounded-full  my-1 '/>
    <input type="text" name="" id=""  className= ' border border-blue-300 px-3 py-1 w-1/2 rounded-full  my-1 '/>
      </div>
 <button className='bg-green-400 hover:bg-green-200 border border-black w-fit px-4 py-1 rounded-full  flex justify-center items-center'><lord-icon
    src="https://cdn.lordicon.com/jgnvfzqg.json"
    trigger="hover">
</lord-icon>SAVE</button>
   </div>

    </>
  )
}

export default Manager
