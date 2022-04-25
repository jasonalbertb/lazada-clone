import React, {useState,useEffect} from 'react'
import {FloatingInput} from "../../components/FloatingInput";
import {createUser} from "../../services/firebase";
import {Modal} from "./Modal";
import {Spinner} from "../../components/Spinner";

export const SignupTab = () => {
  const [nameInput, setNameInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [pwRetypeInput, setPwRetypeInput] = useState("");
  const [modalMsg, setModalMsg] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const handleSubmit = async(e)=>{
    try {
      setIsSubmitDisabled(true);
      setIsSubmitLoading(true);
      e.preventDefault();
      if (passwordInput !== pwRetypeInput) {
        throw new Error("Password does not match");
      }
      await createUser({
        phone: phoneInput,
        email: emailInput,
        password: passwordInput,
        name: nameInput
      })
    } catch (error) {
      setModalMsg(error.message);
      setIsSubmitLoading(false);
    }
    setIsSubmitDisabled(false);
  }

  useEffect(() => {
    setIsSubmitDisabled (!phoneInput || !emailInput || !passwordInput || !pwRetypeInput || !nameInput);
  }, [nameInput, phoneInput, emailInput, passwordInput, pwRetypeInput])
  

  return (
    <div className='bg-white p-8'>
      {modalMsg && <Modal content={modalMsg} setModalMsg={setModalMsg}/>}
      <form 
        onSubmit={handleSubmit}
        className='w-full'
      >
        <FloatingInput 
          type="text" label="Full Name"
          classname="mb-4" 
          value={nameInput} onChange={e=>setNameInput(e.target.value)} />
        <FloatingInput 
          type="number" label="Phone Number" 
          classname="mb-4" 
          value={phoneInput} onChange={e=>setPhoneInput(e.target.value)} />
        <FloatingInput 
          type="email" label="Email" 
          classname="mb-4" 
          value={emailInput} onChange={e=>setEmailInput(e.target.value)} />
        <FloatingInput 
          type="password" label="Password" 
          classname="mb-4" 
          value={passwordInput} onChange={e=>setPasswordInput(e.target.value)} />
        <FloatingInput 
          type="password" label="Re-type Password" 
          classname="mb-8" 
          value={pwRetypeInput} onChange={e=>setPwRetypeInput(e.target.value)} />

        <button 
          disabled={isSubmitDisabled}
          className='inline-flex items-center w-full py-2 disabled:opacity-70 text-white cursor-pointer bg-gradient-to-r from-orange-500 to-pink-500'
          type='submit'
        >
          <span className='mx-auto inline-flex items-center'>
            {isSubmitLoading && <Spinner className="w-4 h-4 mr-2 text-white"/>} SIGN UP
          </span>
        </button>
      </form>
    </div>
  )
}
