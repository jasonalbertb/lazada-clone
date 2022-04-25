import React, {useState} from 'react'
import {createPortal} from "react-dom";
import {ProductOptionModal} from "./ProductOptionModal";
import {BsThreeDotsVertical } from "@react-icons/all-files/bs/BsThreeDotsVertical";
export const ProductOptionBtn = ({className}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = (e)=>{
        if (e.target === e.currentTarget) {
            setIsModalOpen(false);
        }
    };
    return (
        <>
            <button onClick={()=>setIsModalOpen(true)}>
                <BsThreeDotsVertical
                    className={className} 
                />
            </button>
            {(isModalOpen && createPortal(
                <ProductOptionModal closeModal={closeModal}/>,
                document.body
            ))}
        </>
    )
}
