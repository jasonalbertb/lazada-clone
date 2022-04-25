import React from 'react'

export const ProductHightlights = ({details}) => {
  return (
    (details.length > 0 ?
        <div className='my-2 bg-white px-6 py-4 text-sm'>
            <p className='text-gray-500 border-b py-1'>HighLights</p>
            <ul className='list-disc py-4 px-6 text-gray-700 text-sm'>
                {details.map(item=>{
                    return <li className='py-1'>{item}</li>
                })}
            </ul>
        </div>:
        null
    )
  )
}
