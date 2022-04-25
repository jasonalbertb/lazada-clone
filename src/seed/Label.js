import React from 'react'

export const Label = ({children}) => {
  return (
    <label className='w-1/3 flex items-center text-xs font-semibold bg-gray-100'>{children}</label>
  )
}
