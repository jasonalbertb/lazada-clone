import React, {useContext} from 'react'
import {StoreContext} from "../../context/StoreContext";
import {PICS} from "../../constants/pics";
export const StoreBanner = () => {
    const {storeData,isLazmall} = useContext(StoreContext);
    return (
        <div className='relative text-white py-4 bg-transparent'>
            <div className={`absolute w-full h-full top-0 left-0 z-[-1] ${!storeData.bg_banner && "bg-gray-400"} `}>
                {(storeData.bg_banner && 
                    <img 
                        className='w-full h-full object-cover object-center brightness-50'
                        src={storeData.bg_banner} alt="store-banner"
                    />)}
            </div>
            <div className='flex items-center mb-2 mx-4'>
                <img 
                    className='h-16 w-16 mr-2 rounded-md object-cover object-center'
                    src={storeData.logo || PICS.DEFAULT_STORE} alt="store-logo"/>
                    <div className='flex flex-col justify-center'>
                        <p className='font-semibold'>{storeData.store_name}</p>
                        {(isLazmall && <p className='inline-flex items-center my-0.5 bg-white leading-none rounded-md'>
                            <img className='h-4 inline' alt='lazmall-icon'
                            src='https://lzd-img-global.slatic.net/g/tps/tfs/TB1tot9TqL7gK0jSZFBXXXZZpXa-141-42.png_200x200q80.jpg_.webp'/> 
                            <span className='text-red-600 text-[10px] mx-1 font-bold px-0.5'>Flagship Store</span>
                        </p>)}
                        <p className='text-xs font-medium'>{storeData.followers || 0} follower/s</p>
                    </div>
            </div>
            <ul className='flex justify-around'>
                <li>Store</li>
                <li>New</li>
                <li>Customer Gallery</li>
            </ul>
        </div>
    )
}
