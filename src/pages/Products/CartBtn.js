import React, {useState,useEffect} from 'react'
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {ROUTES} from "../../constants/routes";
import {AiOutlineShoppingCart} from "@react-icons/all-files/ai/AiOutlineShoppingCart";
import {listenToCollection} from "../../services/firebase";
import {getAuth} from "firebase/auth";
export const CartBtn = ({className}) => {
    const {userCred} = useSelector(state=>state.user);
    const [cartItems, setCartItems] = useState([]);
    useEffect(()=>{
        try {
            let unsub;
            if (userCred) {
                const {uid} = getAuth().currentUser;
                unsub = listenToCollection(`users/${uid}/cart`, setCartItems);
            }
            return ()=>{
                unsub && unsub();
            }
        } catch (error) {
            console.log(error);
        }
    }, [userCred])
    return (
        <>
            {(userCred?
                <Link to={ROUTES.CART}> 
                    <span className={`inline-block relative`}>
                        <AiOutlineShoppingCart 
                            className={`${className}`}
                        />
                        <span 
                            className={`absolute inline-flex items-center justify-center text-xs
                                 top-0 right-0 text-white bg-red-400 w-4 h-4 rounded-full`}
                        >{cartItems.reduce((total, prev)=>total+prev.quantity,0)}</span>
                    </span>
                </Link>:
                <Link to={ROUTES.LOGIN}><AiOutlineShoppingCart className={className}/> </Link>
            )}
        </>
    )
}
