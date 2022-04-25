import React, {useEffect} from 'react'
import {useSelector, useDispatch} from "react-redux";
import {setMsgError} from "../store/ErrorSlice";
export const ErrorMsgModal = () => {
  const {errorMsg} = useSelector(state=> state.error);
  const dispatch = useDispatch();
  useEffect(()=>{
    const timeout = setTimeout(()=>dispatch(setMsgError(null)), 4000);
    return ()=>{
      clearTimeout(timeout)
    }
  })
  return (
    <div className='fixed w-screen h-screen top-0 left-0 bg-transparent pointer-events-none z-[200]'>
      <div className='text-center text-sm absolute bottom-12 left-1/2 translate-x-[-50%] w-1/2 text-white bg-black-rgba rounded-md py-4'>
        {errorMsg}
      </div>
    </div>
  )
}
