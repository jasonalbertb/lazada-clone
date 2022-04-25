import React, {useState} from 'react'
import {addToCart} from "../../services/firebase";
import {createPortal} from "react-dom";
export const AddToCartBtn = ({storeID, prodID}) => {
    const [OKBtnDisabled, setOKBtnDisabled] = useState(false);
    const [modalMsg, setModalMsg] = useState(null);
    const OKHandler =async()=>{
        try {
            setOKBtnDisabled(true);
            await addToCart({storeID, prodID});
            setModalMsg(null);
        } catch (error) {
            setModalMsg({
                type : "Error",
                header: "Error", 
                content: error.message
            });
        }
        setOKBtnDisabled(false);
    }
    const inquireHandler = ()=>{
        setModalMsg({
            type : "Message",
            header: "Confirm", 
            content: "Add to cart?"
        })
    }
    const closeModal = (e)=>{
        setModalMsg(null)
    }
    return (
        <>
            <button
                onClick={inquireHandler} 
                className='text-white disabled:opacity-50 flex-1 text-sm bg-gradient-to-r from-d-orange1 to-d-orange2'
            >Add to Cart</button>
            {(modalMsg &&
                createPortal(
                    <div className='fixed top-0 left-0 w-screen h-screen bg-black-rgba grid place-items-center z-[100]'>
                        <div className='rounded-lg text-center bg-white w-1/2'>
                            <h1 className='border-b w-full font-semibold text-center py-2'>
                                {modalMsg.header}
                            </h1>
                            <p className='text-sm text-center p-4'>
                                {modalMsg.content}
                            </p>
                            {(modalMsg.type==="Error"?
                                <button 
                                    className='border-2 rounded-md font-bold py-1 px-4 mb-2' 
                                    onClick={closeModal}
                                >OK</button>:
                                <p className='border-t flex items-center justify-around py-1'>
                                    <button 
                                        disabled={OKBtnDisabled}
                                        className='rounded-md font-bold py-1 px-4 disabled:opacity-50' 
                                        onClick={OKHandler}
                                    >OK</button>
                                    <button 
                                        className=' rounded-md font-bold py-1 px-4' 
                                        onClick={closeModal}
                                    >Cancel</button>
                                </p>
                            )}

                        </div>
                    </div>,
                    document.body
                )
            )}
        </>
    )
}
