import React from 'react'

export const ItemsLeftBar = ({stock, sold}) => {
  return (
    <div className='rounded-full h-4 bg-red-300 text-xs text-white mx-2 mb-2 py-.05 px-1.5 relative'>
        <div 
          style={{width : `${Math.floor((sold/(stock+sold))*100)}%`}}
          className={`absolute top-0 left-0 z-10 bg-red-500 rounded-full h-full`}> </div>
        <p className='absolute top-0 left-0 z-20 px-1.5'>{sold} Sold</p>
    </div>
  )
}
