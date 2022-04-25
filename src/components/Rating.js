import React from 'react'
import {RiStarFill} from "@react-icons/all-files/ri/RiStarFill";
import {RiStarLine} from "@react-icons/all-files/ri/RiStarLine";
import {RiStarHalfLine} from "@react-icons/all-files/ri/RiStarHalfLine";
export const Rating = ({rating=1, maxRating=5, className}) => {
    return (
        <span>
        {[...new Array(maxRating)].map((_, i)=>{
                if (rating >= i+1) {
                    return <RiStarFill className={className}/> 
                }else if(Math.ceil(rating-i) === 1){
                    return <RiStarHalfLine className={className}/>
                }else{
                    return <RiStarLine className={className}/> 
                }
        })}
        </span>
    )
}
