import React from 'react'
import {useSelector} from "react-redux";
import {FiChevronLeft} from "@react-icons/all-files/fi/FiChevronLeft";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../constants/routes";
const Error = () => {
  const navigate = useNavigate();
  const {IsError} = useSelector(state=> state.error);
  return (
    <>
      <nav className='fixed w-full h-12 top-0 left-0 grid place-items-center border-b-2'>
        <FiChevronLeft 
          className='h-8 w-8 absolute top-2 left-2'
          onClick={()=>navigate(-1)}/>
          <img 
            onClick={()=>navigate(ROUTES.DASHBOARD)}
            className='h-6' alt='lazada-logo' 
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Lazada_%282019%29.svg/2560px-Lazada_%282019%29.svg.png'/>
      </nav>
      <div className='mt-12'>
        {(IsError && IsError.message) || "Something went wrong"}
      </div>
    </>
  )
}

export default Error