import React from 'react'

export const FloatingInput = ({type, classname, label, value, onChange}) => {
  return (
    <div className={`relative floatingInput pt-4 ${classname}`}>
        <input 
          value={value} onChange={onChange}
          placeholder=' ' 
          className='pb-1 focus:outline-none w-full border-b border-gray-300 appearance-none' 
          type={type}/>
        <label 
          className={`origin-[0%] absolute top-5 left-0 pointer-events-none text-sm text-gray-400
                      transition duration-100 ease-in-out`}
        >{label}</label>
    </div>
  )
}
