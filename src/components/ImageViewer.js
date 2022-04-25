import React, {useState} from 'react'
import {createPortal} from "react-dom";
import {IoMdClose} from "@react-icons/all-files/io/IoMdClose";
export const ImageViewer = ({className, src, alt}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            <img 
                onClick={()=>setIsModalOpen(true)}
                className={className} 
                src={src} alt={alt}
            />
            {(isModalOpen && createPortal(
                <div className='fixed top-0 left-0 w-screen h-screen z-[100] bg-black-rgba-dark grid place-items-center'>
                    <button className='absolute z-[110] top-4 right-4'  
                        onClick={()=>setIsModalOpen(false)}
                    >
                        <IoMdClose className='text-gray-500 w-6 h-6 block p-0.5 bg-gray-50 rounded-full'/>
                    </button>
                    <img className="object-contain min-w-full" src={src} alt={alt}/>
                </div>,
                document.body
            ))}
        </>
    )
}
