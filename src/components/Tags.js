import React, {useState, useEffect} from 'react'
import {checkIfLazmall,checkIfLazGlobal} from "../services/firebase";

export const Tags = ({storeID}) => {
    const [isLazmall, setIsLazmall] = useState(false);
    const [isLazGlobal, setIsLazGlobal] = useState(false);
    const [isLoading,setIsLoading] = useState(true);
    useEffect(()=>{
        (async()=>{
            setIsLazmall(await checkIfLazmall(storeID));
            setIsLazGlobal(await checkIfLazGlobal(storeID));
            setIsLoading(false);
        })() 
    }, [storeID])
    if (isLoading) {
        return <></>
    }
    return (
        <span className='inline items-center'>
            {isLazmall && <img className='h-4 inline' 
                alt='lazmall-icon'
                src='https://lzd-img-global.slatic.net/g/tps/tfs/TB1tot9TqL7gK0jSZFBXXXZZpXa-141-42.png_200x200q80.jpg_.webp'/>}
            {isLazGlobal && <span className='px-1 mx-1 text-white bg-violet-600 text-[12px] font-semibold rounded-sm' >
                LazGlobal</span>}
        </span>
    )
}
