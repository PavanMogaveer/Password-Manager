import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';




function Manager() {

  const ref = useRef()
  const passref = useRef()
  const [form, setform] = useState({ url: "", username: "", password: "" })
  const [PasswordArray, setPasswordArray] = useState([])


  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords))
    }
  }, [])


  const toggle = () => {
    if (ref.current.src.endsWith("/icons/eye.svg")) {
      ref.current.src = '/icons/eye-slash.svg'
      passref.current.type = "text"
    }
    else {
      ref.current.src = `/icons/eye.svg`
      passref.current.type = "password"
    }
  }

  const savePassword = () => {

    setPasswordArray([...PasswordArray, {...form,id:uuidv4()}])
    localStorage.setItem("passwords", JSON.stringify([...PasswordArray, form]))
    setform({url: "", username: "", password: ""} )
    toast('Saved Successfully');
}

const deletePassword = (id) => {

  setPasswordArray(PasswordArray.filter(item=>item.id!==id))
  localStorage.setItem("passwords", JSON.stringify(PasswordArray.filter(item=>item.id!==id)))
  toast('Deleted Successfully');
    
  
}


const editPassword = (id) => {

  setform(PasswordArray.filter(item=>item.id===id)[0])
  setPasswordArray(PasswordArray.filter(item=>item.id!==id))
}



  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

const copytext=(text) => {
  navigator.clipboard.writeText(text)
  toast('Copied to clipboard');

}


  return (
    <>
      <div className="fixed inset-0 -z-10 h-full  w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
      <div className="container flex   flex-col  items-center justify-center">
        <span className='text-center text-blue-500 font-semibold mb-1'>Password Manager</span>
<ToastContainer/>
        <input type="url" value={form.url} onChange={handlechange} name="url" id="url" placeholder='Enter Website URL' className=' border border-blue-300 px-3 py-1 w-3/4 rounded-full  ' />


        <div className='my-1  flex w-3/4 gap-2 m-auto flex-col md:flex-row '>
          <input type="text" value={form.username} onChange={handlechange} name="username" id="username" placeholder='Enter WebsiteName' className=' border border-blue-300 px-3 py-1 w-3/5 rounded-full  my-1 ' />
          <div className="pass relative -z-10 ">

            <input type="password" ref={passref} value={form.password} onChange={handlechange} name="password" id="password" placeholder='Enter Password' className=' border border-blue-300 px-3 py-1  w-full md:w-full rounded-full  my-1 ' />

            <span onClick={toggle} className='absolute right-[2px] top-[5px]  hover:cursor-pointer'>

              <img className='p-1' ref={ref} width={30} src="/public/icons/eye.svg" alt="eye" />
            </span>
          </div>
        </div>

        <button onClick={savePassword} className='bg-green-400 hover:bg-green-200 border border-black w-fit px-4 py-1 rounded-full  flex justify-center items-center'><lord-icon
          src="https://cdn.lordicon.com/jgnvfzqg.json"
          trigger="hover">
        </lord-icon>SAVE</button>


        <div className="saved mt-5 w-3/4 m-auto ">
        
          {PasswordArray.length == 0 && <div className='text-center '> No saved passwords</div>}
          {PasswordArray.length != 0 &&
            <div className='text-center '><p className='font-bold text-blue-700 m-2'>Saved Passwords</p>
              <table className='table-auto w-full rounded-md overflow-hidden mb-10 '>
                <thead className='bg-blue-600 text-white text-center'>
                  <tr>
                    <th className='border border-blue-300'>Website</th>
                    <th className='border border-blue-300'>UserName</th>
                    <th className='border border-blue-300'>Password</th>
                    <th className='border border-blue-300'>Actions</th>
                  </tr>
                </thead>

                <tbody className=' bg-blue-200'>

                  {PasswordArray.map((element, index) => (
                    <tr key={index} >

                      <td className='border border-blue-100 py-1 '>  
                         <div className='cursor-pointer  flex justify-center   '> <a href={element.url}>
                        {element.url}</a>
                   
                       <span onClick={()=>copytext(element.url)}> 
                        <lord-icon src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover" style={{"width":"30px",'height':'30px'}}>
                            
                        </lord-icon></span>

                        </div>

                      </td>
                      
                      <td className='border border-blue-100 py-1 '>   <div className='cursor-pointer  flex justify-center   '> 
                      {element.username}
                        <span onClick={()=>copytext(element.username)}> <lord-icon src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover" style={{"width":"30px",'height':'30px'}}>
                            
                        </lord-icon></span>
                        </div></td>


                        <td className='border border-blue-100 py-1 '>   <div className='cursor-pointer  flex justify-center   '> 
                      {element.password}
                      <span onClick={()=>copytext(element.password)}> <lord-icon src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover" style={{"width":"30px",'height':'30px'}}>
                            
                        </lord-icon></span>
                        </div>
                        </td>

                        <td className='border border-blue-100 py-1 '>   <div className='cursor-pointer  flex justify-center  gap-2 '> 
                      
                      <span onClick={()=>editPassword(element.id)} > <lord-icon src="https://cdn.lordicon.com/gwlusjdu.json"
                          trigger="hover" style={{"width":"30px",'height':'30px'}}>
                      </lord-icon>
                      </span>
                      <span onClick={()=>deletePassword(element.id)}  >  <lord-icon src="https://cdn.lordicon.com/skkahier.json"
                          trigger="hover" style={{"width":"30px",'height':'30px'}}>
                      </lord-icon>
                      </span>
                        </div>
                        </td>

                      

                     
                    </tr>

                  ))}



                </tbody>
              </table>
            </div>






          }

        </div>

      </div>

    </>
  )
}

export default Manager
