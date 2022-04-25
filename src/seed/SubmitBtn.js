import React from 'react'

export const SubmitBtn = ({disabled}) => {
  return (
    <button 
        disabled={disabled}
        type='submit' 
        className='border font-semibold p-1 disabled:bg-white disabled:text-gray-500 bg-gray-500 text-white'
    >Submit</button>
  )
}
