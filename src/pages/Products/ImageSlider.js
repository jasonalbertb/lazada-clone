import React, {useState} from 'react'
import {FiChevronLeft} from "@react-icons/all-files/fi/FiChevronLeft";
import {FiChevronRight} from "@react-icons/all-files/fi/FiChevronRight";
import {IoMdArrowRoundBack} from "@react-icons/all-files/io/IoMdArrowRoundBack";
import {useNavigate} from "react-router-dom";
import {ProductOptionBtn} from "./ProductOptionBtn";
import {CartBtn} from "./CartBtn";

export const ImageSlider = ({gallery}) => {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);

  const nextHandler = ()=>{
    setActive(val=>{
      if (val >= gallery.length -1) {
        return gallery.length -1
      }
      return val + 1
    })
  }
  const prevHandler = ()=>{
    setActive(val=>{
      if (val <= 0) {
        return 0
      }
      return val - 1
    })
  }
  return (
    <div className='relative w-full h-96 overflow-hidden bg-white'>
        <div className='text-white px-1.5 rounded-full text-sm absolute bottom-4 left-1/2 translate-x-[-50%] z-10 bg-black-rgba'>
          {active + 1}/{gallery.length}
        </div>
        <div className='absolute top-2 right-2 z-10 flex'>
          <CartBtn 
            className={"p-1 mx-2 cursor-pointer w-7 h-7 text-white bg-black-rgba rounded-full"}
          />
          <ProductOptionBtn className="p-1 cursor-pointer w-7 h-7 text-white bg-black-rgba rounded-full"/>
        </div>
        <IoMdArrowRoundBack
          onClick={()=>navigate(-1)}
          className="p-1 z-10 w-7 h-7 text-white bg-black-rgba rounded-full absolute top-2 left-2"/>
        <FiChevronLeft 
          onClick={prevHandler}
          className={`${active === 0 && "opacity-30"} cursor-pointer w-8 h-8 rounded-full text-white bg-black-rgba absolute top-1/2 left-2 translate-y-[-50%] z-10`}/>
        {gallery.map((item, i)=>{
          return (
            <img
                className={`absolute top-0 left-0 object-contain w-full h-full transition duration-200 ease-in-out
                ${active === i? "translate-x-0 opacity-100": i > active? "translate-x-[100%] opacity-0": "translate-x-[-100%] opacity-0"}`}
                src={item} alt={`img${i}`}/>
          )
        })}
         <FiChevronRight 
          onClick={nextHandler}
          className={`${active === gallery.length -1  && "opacity-30"} cursor-pointer w-8 h-8 rounded-full text-white bg-black-rgba absolute top-1/2 right-2 translate-y-[-50%] z-10`}/>
    </div>
  )
}
