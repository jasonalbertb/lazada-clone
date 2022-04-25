import React from 'react'
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import { ROUTES } from '../../constants/routes';
export const ProductOptionModal = ({closeModal}) => {
    const {userCred} = useSelector(state=>state.user);
    return (
        <div 
            onClick={closeModal}
            className='w-screen h-screen bg-black-rgba drop-shadow-2xl fixed top-0 left-0 z-[100] '
        >
                <ul className='absolute top-2 right-2 bg-white text-sm px-4 py-2 rounded-md w-40'>
                    {(!userCred && <li className='py-2'>
                        <Link to={ROUTES.LOGIN}>Login</Link>
                    </li>)}
                    <li className='py-2'><Link to={ROUTES.DASHBOARD}>Home</Link></li>
                    <li className='py-2'><Link to={ROUTES.ACC_TAB}>My Account</Link></li>
                    <li className='py-2'><Link to={ROUTES.CART}>My Orders</Link></li>
                    <li className='py-2'>My Wishlist</li>
                    <li className='py-2'>Need Help?</li>
                </ul>
        </div>
    )
}
