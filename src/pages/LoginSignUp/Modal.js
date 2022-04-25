import React, {useEffect} from 'react'

export const Modal = ({content, setModalMsg}) => {
    useEffect(()=>{
        const timeout = setTimeout(()=>setModalMsg(""), 5000);
        return ()=>{
            clearTimeout(timeout);
        }
    })
    return (
        <div className='text-[10px] uppercase text-red-500 text-center tracking-wider'>
            {content}
        </div>
    )
}
