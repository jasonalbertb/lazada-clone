import React from 'react'
import {FaCheck} from "@react-icons/all-files/fa/FaCheck";

export const RoundedCheckBox = ({checked, onChange}) => {
  return (
    <div className='flex items-center relative'>
        <input 
            className={`mr-4 w-5 h-5 border appearance-none border-gray-500 rounded-full  outline-none cursor-pointer
            checked:bg-sky-500 checked:border-none`}
            type="checkbox" 
            checked={checked} 
            onChange={onChange}
        />
        {checked && <FaCheck className='absolute w-3 h-3 top-1 left-1 text-white pointer-events-none'/>}
    </div>
  )
}
