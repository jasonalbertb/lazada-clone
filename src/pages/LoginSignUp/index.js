import React,{useState} from 'react'
import {LoginTab} from "./LoginTab";
import {SignupTab} from "./SignupTab";
const LoginSignUp = () => {
  const [tab, setTab] = useState("login");

  return (
    <div className='bg-gray-100'>
      <nav className='w-full flex bg-white mb-2'>
        <div 
          onClick={()=>setTab("login")}
          className={`text-center w-1/2 text-sm font-bold py-3 ${tab === "login" ? "text-red-400 border-b-4 border-red-400": "text-gray-400"}`}
          >LOGIN</div>
        <div 
          onClick={()=>setTab("signup")}
          className={`text-center w-1/2 text-sm font-bold py-3 ${tab === "signup"? "text-red-400 border-b-4 border-red-400": "text-gray-400"}`}
        >SIGN UP</div>
      </nav>
      {(tab === "login"?  
        <LoginTab />:
        <SignupTab />
      )}
    </div>
  )
}

export default LoginSignUp