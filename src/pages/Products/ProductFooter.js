import React from 'react'
import {ROUTES} from "../../constants/routes";
import {BiStoreAlt} from "@react-icons/all-files/bi/BiStoreAlt";
import {BiChat} from "@react-icons/all-files/bi/BiChat";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {AddToCartBtn} from "./AddToCartBtn";
export const ProductFooter = ({storeID, prodID}) => {
    const {userCred} = useSelector(state=> state.user);

    return (
        <div className='fixed bottom-0 flex z-[50] w-full bg-white'>
            <Link 
                className='inline-flex flex-col items-center mx-4'
                to={ROUTES.STORE(storeID)}
            > 
                <BiStoreAlt className='w-8 h-8 text-orange-400 mb-1'/>
                <span className='text-[10px] text-gray-500'>Store</span>
            </Link>
            <Link 
                className='inline-flex flex-col items-center mx-4'
                to={"/"}
            > 
                <BiChat className='w-8 h-8 text-orange-400 mb-1'/>
                <span className='text-[10px] text-gray-500'>Chat</span>
            </Link>
            <button className={`text-white flex-1 text-sm bg-gradient-to-r from-orange1 to-orange2`}>
                Buy Now
            </button>
            {(userCred?
                <AddToCartBtn storeID={storeID} prodID={prodID}/>:
                <Link 
                    className='inline-flex items-center justify-center text-white flex-1 text-sm bg-gradient-to-r from-d-orange1 to-d-orange2'
                    to={ROUTES.LOGIN}
                >Add to Cart</Link>
            )}
            
        </div>
    )
}
