import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';




function Manager() {

  const ref = useRef()
  const passref = useRef()
  const [form, setform] = useState({ url: "", username: "", password: "" })
  const [PasswordArray, setPasswordArray] = useState([])


  const getpassword=async() => {
    let req=await fetch('http://localhost:3000/')
    let passwords=await req.json()
    setPasswordArray(passwords)

  }
  
  useEffect(() => {
    getpassword()
    // let passwords = localStorage.getItem("passwords");
    // if (passwords) {
    //   setPasswordArray(JSON.parse(passwords))
    // }
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

  const savePassword =async () => {
if(form.url.length>5 && form.username.length>3 && form.password.length>5){
    setPasswordArray([...PasswordArray, {...form,id:uuidv4()}])

    await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"},body: JSON.stringify({id:form.id})});
   await fetch("http://localhost:3000/",{method:"POST",headers:{"Content-Type":"application/json"},body: JSON.stringify({...form, id: uuidv4()})

  })
    // localStorage.setItem("passwords", JSON.stringify([...PasswordArray, form]))
    setform({url: "", username: "", password: ""} )
    toast('Saved Successfully');
}
else{
  toast('Inavlid inputs');

}
}

const deletePassword =async (id) => {

  setPasswordArray(PasswordArray.filter(item=>item.id!==id))
  // localStorage.setItem("passwords", JSON.stringify(PasswordArray.filter(item=>item.id!==id)))
  await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"},body: JSON.stringify({id})});

  toast('Deleted Successfully');
    
  
}


const editPassword = (id) => {

    setform({...PasswordArray.filter(item=>item.id===id)[0],id:id})
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
     
      <div className="container flex   flex-col  items-center justify-center">
        <span className='text-center text-blue-500 font-semibold mb-1'>Password Manager</span>
<ToastContainer/>
        <input type="url" value={form.url} onChange={handlechange} name="url" id="url" placeholder='Enter Website URL' className=' border border-blue-300 px-3 py-1 w-3/4 rounded-full  ' />


        <div className='my-1  flex w-3/4  gap-2  flex-col md:flex-row '>
          <input type="text" value={form.username} onChange={handlechange} name="username" id="username" placeholder='Enter UserName' className=' border border-blue-300 px-3 py-1 w-full rounded-full  my-1 ' />
          <div className="pass relative w-full z-0 ">

            <input type="password" ref={passref} value={form.password} onChange={handlechange} name="password" id="password" placeholder='Enter Password' className=' border border-blue-300 px-3 py-1 w-full   rounded-full  my-1 ' />

            <span onClick={toggle} className='absolute right-[2px] top-[3px]  hover:cursor-pointer p-1'>

              <img className='p-1' ref={ref} width={30} src="/icons/eye.svg" alt="eye" />
            </span>
          </div>
        </div>

        <button onClick={savePassword} className='bg-green-400 hover:bg-green-200 border border-black w-fit px-4 py-1 rounded-full  flex justify-center items-center'><lord-icon
          src="https://cdn.lordicon.com/jgnvfzqg.json"
          trigger="hover">
        </lord-icon>SAVE</button>



<div className="saved mt-5 w-full lg:w-3/4 m-auto px-4 text-l md:text-sx">
  {PasswordArray.length === 0 ? (
    <div className="text-center text-gray-600">No saved passwords</div>
  ) : (
    <div className="text-center m-auto">
      <p className="font-bold text-blue-700 m-2">Saved Passwords</p>
      <div className=" text-l  ">
        <table className="table-auto w-full rounded-md overflow-hidden mb-10">
          <thead className="bg-blue-600 text-white text-center">
            <tr>
              <th className="border border-blue-300 px-2 py-2  ">Website</th>
              <th className="border border-blue-300 px-2 py-2 ">UserName</th>
              <th className="border border-blue-300 px-2 py-2 ">Password</th>
              <th className="border border-blue-300 px-2 py-2 ">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-blue-200 break-all leading-none">
            {PasswordArray.map((element, index) => (
              <tr key={index} className='border border-white'>
              
                <td className="border border-blue-100 p-0 md:p-[3px] ">
                  <div className="cursor-pointer flex items-center justify-center gap-1 ">
                  <a href={element.url} className=" underline">
                      {element.url}
                    </a>
                    <span onClick={() => copytext(element.url)} className='pt-2'>
                      <lord-icon
                        src="https://cdn.lordicon.com/iykgtsbt.json"
                        trigger="hover"
                        style={{ width: "25px", height: "25px"  }}
                      ></lord-icon>
                    </span>
                  </div>
                </td>
                
                <td className="border border-blue-100 p-0 md:p-[3px]">
                  <div className="cursor-pointer flex items-center justify-center gap-1 ">
                    <span>{element.username}</span>
                    <span onClick={() => copytext(element.username)}  className='pt-2'>
                      <lord-icon
                        src="https://cdn.lordicon.com/iykgtsbt.json"
                        trigger="hover"
                        style={{ width: "25px", height: "25px"  }}
                      ></lord-icon>
                    </span>
                  </div>
                </td>
                <td className="border border-blue-100 p-0 md:p-[3px] ">
                  <div className="cursor-pointer flex items-center justify-center gap-1 ">
                    <span>{"*".repeat(element.password.length)}</span>
                    <span onClick={() => copytext(element.password)} className='pt-2'>
                      <lord-icon
                        src="https://cdn.lordicon.com/iykgtsbt.json"
                        trigger="hover"
                        style={{ width: "25px", height: "25px"  }}
                      ></lord-icon>
                    </span>
                  </div>
                </td>
                <td className="border border-blue-100 p-[5px]">
                  <div className="cursor-pointer flex justify-center items-center gap-1">
                    <span onClick={() => editPassword(element.id)} >
                      <lord-icon
                        src="https://cdn.lordicon.com/gwlusjdu.json"
                        trigger="hover"
                        style={{ width: "25px", height: "25px" }}
                      ></lord-icon>
                    </span>
                    <span onClick={() => deletePassword(element.id)}>
                      <lord-icon
                        src="https://cdn.lordicon.com/skkahier.json"
                        trigger="hover"
                        style={{ width: "25px", height: "25px" }}
                      ></lord-icon>
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )}
</div>


      </div>

    </>
  )
}

export default Manager
