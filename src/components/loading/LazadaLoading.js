import React from 'react'
import {AiOutlineLoading3Quarters} from "@react-icons/all-files/ai/AiOutlineLoading3Quarters";

export const LazadaLoading = () => {
  return (
    <div className='fixed w-screen h-screen top-0 left-0 z-[100] bg-black-rgba-light grid place-items-center'>     
        <div className='relative rounded-full w-16 h-16 bg-white'>
            <img   
                className='w-full h-full p-3'
                alt='lazada-logo'
                src="https://s1.kaercher-media.com/media/image/selection/96882/m3/karcher-official-lazada-store.webp" 
            />
            <div className='absolute w-full h-full top-0 left-0 grid place-items-center'>
                <AiOutlineLoading3Quarters 
                    className='text-red-200 animate-spin w-full h-full p-1 top-0 left-0'/>
            </div>
        </div>
    </div>
  )
}
