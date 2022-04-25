import React from 'react'
import {useNavigate} from "react-router-dom";
import {HiArrowLeft} from  "@react-icons/all-files/hi/HiArrowLeft";
export const BasicHeader = ({title}) => {
    const navigate = useNavigate();
    return (
        <nav className='flex h-12 items-center bg-white fixed top-0 left-0 z-50 px-4 w-full'>
            <button onClick={()=>navigate(-1)} className="mr-2">
                <HiArrowLeft className='w-6 h-6'/>
            </button>
            {title} 
        </nav>
    )
}
