import React, {useContext} from 'react'
import {FaCheck} from "@react-icons/all-files/fa/FaCheck";
import {currencyFormat} from "../../helpers/utils";
import {CartContext} from "../../context/CartContext";
import {selectAllCartItems } from "../../services/firebase";
import {useDispatch} from "react-redux";
import {setMsgError} from "../../store/ErrorSlice";
import {setModalLazadaLoading} from "../../store/LoadingSlice";
export const CartFooter = () => {
    const dispatch = useDispatch();
    const {
            allSelected, selectedCount, 
            subtotal, shipping_fee
    } = useContext(CartContext);
    const checkboxHandler = async({target})=>{
        try {
            dispatch(setModalLazadaLoading(true))
            await selectAllCartItems({selected: target.checked});
        } catch (error) {
            dispatch(setMsgError(error.message));
        }
        dispatch(setModalLazadaLoading(false));
    }
    return (
        <div className='fixed h-16 border-t bg-white px-4 z-50 bottom-0 w-full flex justify-between'>
            <div className='flex items-center'>
                <div className='flex items-center relative'>
                    <input 
                        className={`mr-2 w-5 h-5 border appearance-none border-gray-500 rounded-full  outline-none cursor-pointer
                        checked:bg-sky-500 checked:border-none`}
                        type="checkbox" 
                        checked={allSelected} 
                        onChange={checkboxHandler}
                    /> 
                    {allSelected && <FaCheck className='absolute w-3 h-3 top-1 left-1 text-white pointer-events-none'/>}
                </div>
                <p>All</p>
            </div>
            
            <div className='flex items-center'>
                <div>
                    <p className='text-sm'>
                        Subtotal : 
                        <span className='font-bold text-lg px-2 text-red-400'>{currencyFormat(subtotal)}</span></p>
                    <p className='text-xs text-gray-500'>
                        Shipping Fee <span className='text-red-400 font-medium'>{currencyFormat(shipping_fee)}</span>
                    </p>
                </div>
                <button className={`text-white font-medium flex-1 bg-gradient-to-r from-orange2 to-pink-500 px-4 py-2 rounded-full`}>
                    Check Out{selectedCount>0 && `(${selectedCount})`}
                </button>
            </div>
        </div>
    )
}
