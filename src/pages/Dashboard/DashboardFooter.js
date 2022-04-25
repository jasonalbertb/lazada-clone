import React from 'react'
import {Link} from "react-router-dom";
import {ROUTES} from "../../constants/routes";
import {BsListUl} from "@react-icons/all-files/bs/BsListUl";
import {IoMdCart} from "@react-icons/all-files/io/IoMdCart";
import {RiAccountCircleLine} from "@react-icons/all-files/ri/RiAccountCircleLine";
import {useSelector} from "react-redux";

export const DashboardFooter = () => {
    const {userCred} = useSelector(state=>state.user);
    return (
        <nav className='fixed bottom-0 w-full text-gray-600 z-50 font-medium bg-white p-1'>
            <ul className='flex justify-around '>
                <li>
                    <Link to={ROUTES.DASHBOARD}  className="inline-flex flex-col items-center">
                        <img 
                            className='w-8 h-8 object-cover object-center'
                            alt='lazada-icon'
                            src="https://s1.kaercher-media.com/media/image/selection/96882/m3/karcher-official-lazada-store.webp"
                        />
                        <p className='text-xs leading-none'>Home</p>
                    </Link>
                </li>
                <li>
                    <Link to={ROUTES.CATEGORY_TAB} className="inline-flex flex-col items-center">
                        <BsListUl className='w-8 h-8'/>
                        <p  className='text-xs leading-none'>Categories</p>
                    </Link>
                </li>
                <li>
                    {(userCred?
                        <Link to={ROUTES.CART} className="inline-flex flex-col items-center">
                            <IoMdCart className='w-8 h-8 '/>
                            <p  className='text-xs leading-none'>Cart</p>
                        </Link>:
                        <Link to={ROUTES.LOGIN} className="inline-flex flex-col items-center">
                            <IoMdCart className='w-8 h-8 '/>
                            <p  className='text-xs leading-none'>Cart</p>
                        </Link>
                    )}
                    
                </li>
                <li>
                    <Link to={ROUTES.ACC_TAB}  className="inline-flex flex-col items-center">
                        <RiAccountCircleLine className='w-8 h-8 '/>
                        <p  className='text-xs leading-none'>Account</p>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
