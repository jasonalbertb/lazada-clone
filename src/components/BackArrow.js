import React from 'react'
import {IoMdArrowRoundBack} from "@react-icons/all-files/io/IoMdArrowRoundBack";
import {useNavigate} from "react-router-dom";
export const BackArrow = ({className}) => {
    const navigate = useNavigate();
    return (
        <button
            onClick={()=>navigate(-1)}
        >
            <IoMdArrowRoundBack className={className}/>
        </button>
    )
}
