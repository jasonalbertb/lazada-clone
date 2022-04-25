import React from 'react'
import {ImSpinner2} from "@react-icons/all-files/im/ImSpinner2"
export const ReactLoader = () => {
  return (
    <div className='w-screen h-screen bg-gray-100 grid place-items-center'>
        <ImSpinner2 className='animate-spin w-8 h-8 text-gray-400'/>
    </div>
  )
}
