import React from 'react'
import {CgSpinner} from "@react-icons/all-files/cg/CgSpinner";
export const Loading = () => {
  return (
    <div className='grid place-items-center w-full h-60 rounded-xl bg-gray-100 border'>
        <CgSpinner className='animate-spin w-6 h-6'/>
    </div>
  )
}

export default Loading