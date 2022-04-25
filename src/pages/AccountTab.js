import React from 'react'
import {BasicHeader} from "../components/headers/BasicHeader";
import {FiPackage} from "@react-icons/all-files/fi/FiPackage";
import {AiOutlineHeart} from "@react-icons/all-files/ai/AiOutlineHeart";
import {GrDocumentText} from "@react-icons/all-files/gr/GrDocumentText";
import {FiHelpCircle} from "@react-icons/all-files/fi/FiHelpCircle";
import {Link} from "react-router-dom";
import {ROUTES} from "../constants/routes";
import {useSelector} from "react-redux";
import {getAuth} from "firebase/auth";
import {signOut} from "firebase/auth";
const AccountTab = () => {
  const {userCred} = useSelector(state=>state.user);
  return (
    <>
      <BasicHeader title="My Account"/>
      <div className='bg-gray-100'>
        <div className='mt-12'>
        <div className='mb-2 flex justify-between items-center border p-2 bg-gradient-to-r from-cyan-900 to-cyan-600'>
          <p className='text-xs text-white'>Hello , {userCred? getAuth().currentUser.displayName : "Welcome to Lazada!"} </p>
          {(userCred? 
            <button 
              onClick={()=>signOut(getAuth())}
              className='text-xs bg-orange-500 text-white px-3 py-2 rounded-sm'
            >LOGOUT</button>:
            <Link 
              to={ROUTES.LOGIN}
              className='text-xs bg-orange-500 text-white px-3 py-2 rounded-sm'
            >LOGIN / SIGNUP</Link>
          )}
          
        </div>
        <ul>
          <li className='bg-white mb-0.5' >
            <Link to={ROUTES.ORDERS} className="flex items-center p-4">
              <FiPackage className='mr-4 w-6 h-6'/> My Orders
            </Link>
          </li>
          <li className='bg-white mb-2'>
            <Link to={ROUTES.WISHLIST} className="flex items-center p-4">
              <AiOutlineHeart className='mr-4 w-6 h-6'/>My Wishlist
            </Link>
          </li>
          <li className='bg-white mb-0.5'>
            <Link to={ROUTES.POLICIES} className="flex items-center p-4">
              <GrDocumentText className='mr-4 w-6 h-6'/>Policies
            </Link>
          </li>
          <li className='bg-white'>
            <Link to={ROUTES.HELP} className="flex items-center p-4">
              <FiHelpCircle className='mr-4 w-6 h-6'/>Help
            </Link>
          </li>
        </ul>
        </div>
      </div>
    </>
    
  )
}

export default AccountTab