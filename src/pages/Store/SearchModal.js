import React from 'react'
import {RiCloseLine} from "@react-icons/all-files/ri/RiCloseLine";
import {IoMdArrowRoundBack} from "@react-icons/all-files/io/IoMdArrowRoundBack";
export const SearchModal = ({closeModal}) => {
  const submitHandler = (e)=>{
    e.preventDefault();
    console.log("submit");
  }
  return (
    <div className='fixed w-screen h-screen top-0 left-0 z-[100] bg-white'>
      <form
        onSubmit={submitHandler} 
        className='bg-gradient-to-r from-cyan-800 via-cyan-600 to-cyan-400 flex'
      >
        <button onClick={closeModal}>
          <IoMdArrowRoundBack  className="w-5 h-5 text-white block m-4"/>
        </button>
        <div className='relative flex-1 flex items-center'>
          <input 
            type="text" 
            className='w-full bg-transparent focus:outline-none text-white text-sm' 
            placeholder='Search in Lazada'
          />
          <RiCloseLine className='w-6 h-6 absolute right-4 top-1/2 translate-y-[-50%] text-black-rgba '/>
        </div>
        <button className='text-white block px-4' type='submit'>SEARCH</button>
      </form>
    </div>
  )
}
