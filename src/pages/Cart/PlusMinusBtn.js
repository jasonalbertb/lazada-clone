import React, {useState, useEffect} from 'react';
import {FaPlusSquare} from "@react-icons/all-files/fa/FaPlusSquare";
import {FaMinusSquare} from "@react-icons/all-files/fa/FaMinusSquare";
import {addToCart} from "../../services/firebase";
import {useDispatch} from "react-redux";
import {setMsgError} from "../../store/ErrorSlice";
import {setModalLazadaLoading} from "../../store/LoadingSlice";

export const PlusMinusBtn = ({children, storeID, prodID, stock, quantity}) => {
    const dispatch = useDispatch();
    const [plusDisabled, setPlusDisabled] = useState(false);
    const [minusDisabled, setMinusDisabled] = useState(false);
    const clickHandler = async(action)=>{
        try {
            dispatch(setModalLazadaLoading(true));
            if (action === "inc") {
                await addToCart({storeID, prodID})
            }else{
                await addToCart({storeID, prodID, inc:false})
            }
        } catch (error) {
            dispatch(setMsgError(error.message))
        }
        dispatch(setModalLazadaLoading(false));
    }

    useEffect(()=>{
        if (quantity < 2) {
            setMinusDisabled(true);
        }else{
            setMinusDisabled(false);
        }
        if (quantity >= stock) {
            setPlusDisabled(true);
        }else{
            setPlusDisabled(false);
        }
    }, [stock, quantity])

    return (
       <>
            <button 
                className='text-gray-500 disabled:text-gray-300'
                disabled={minusDisabled}
                onClick={()=>clickHandler("dec")}
            ><FaMinusSquare className=' w-5 h-5'/>
            </button>
            {children}
            <button
                className='text-gray-500 disabled:text-gray-300'
                disabled={plusDisabled} 
                onClick={()=>clickHandler("inc")}
            ><FaPlusSquare className='w-5 h-5'/>
            </button>
       </>
    )
}
