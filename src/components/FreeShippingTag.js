import React from 'react'

export const FreeShippingTag = () => {
  return (
    <span className={`mb-1 inline-flex text-[10px] font-bold text-green-500 relative border rounded-md border-green-500
                 before:content[' '] before:absolute before:left-[-1px] before:top-1/2 before:translate-y-[-50%]  before:w-1.5 before:h-1.5 before:border before:border-l-0 before:rounded-r-full before:border-green-500 before:bg-white
                 after:content[' '] after:absolute after:right-[-1px] after:top-1/2 after:translate-y-[-50%]  after:w-1.5 after:h-1.5 after:border after:border-r-0 after:rounded-l-full after:border-green-500 after:bg-white`}>
        <span className='px-1.5 inline-block border-r border-green-500'>Laz </span> <span className='px-1.5'>Daily Free Shipping</span>
    </span>
  )
}
