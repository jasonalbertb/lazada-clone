import React, {useState, useEffect} from 'react'
import {FloatingInput} from "../../components/FloatingInput";
import {Modal} from "./Modal";
import {getAuth ,signInWithEmailAndPassword} from "firebase/auth";
import {Spinner} from "../../components/Spinner";
export const LoginTab = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [modalMsg, setModalMsg] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const handleSubmit = async(e)=>{
    try {
      e.preventDefault();
      setIsSubmitDisabled(true);
      setIsSubmitLoading(true);
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, emailInput, passwordInput);
    } catch (error) {
      setModalMsg(error.message);
      setEmailInput("");
      setPasswordInput("");
      setIsSubmitLoading(false);
    }
  }

  useEffect(()=>{
    setIsSubmitDisabled(!passwordInput || !passwordInput);
  }, [emailInput, passwordInput]);

  return (
    <div className='bg-white p-8'>
      {modalMsg && <Modal content={modalMsg} setModalMsg={setModalMsg}/>}
      <form 
        onSubmit={handleSubmit}
        className='w-full'
      >
        <FloatingInput 
          type="email" label="Email" 
          classname="mb-4" 
          value={emailInput} onChange={e=>setEmailInput(e.target.value)} />
        <FloatingInput 
          type="password" label="Password" 
          classname="mb-4" 
          value={passwordInput} onChange={e=>setPasswordInput(e.target.value)} />
        <p className='my-6 text-xs text-right text-sky-500'>Forgot Password?</p>
        <button 
          disabled={isSubmitDisabled}
          className='inline-flex items-center disabled:opacity-70 w-full py-2 text-white cursor-pointer bg-gradient-to-r from-orange-500 to-pink-500'
          type='submit'
        >
          <span className='mx-auto inline-flex items-center'>
            {isSubmitLoading && <Spinner className="w-4 h-4 mr-2 text-white"/>} LOGIN
          </span>
        </button>
      </form>
    </div>
  )
}
