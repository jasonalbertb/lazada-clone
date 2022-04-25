import React from 'react'
import {Link} from "react-router-dom";
import {ProductOptionBtn} from "./ProductOptionBtn";
import {BackArrow} from "../../components/BackArrow";
import {CartBtn} from "./CartBtn";

export const ProductHeader = () => {

    return (
        <div className='fixed top-0 left-0 w-full z-50 bg-white'>
        <div className='h-14 flex border-b justify-between items-center px-4'>
                <div className='flex items-center '>
                    <img 
                        className='h-9 w-9 rounded-md mr-2' alt="lazada-icon"
                        src='https://laz-img-cdn.alicdn.com/images/ims-web/TB1wMswAlr0gK0jSZFnXXbRRXXa.png'/>
                    <div>
                        <p className='text-sm font-semibold'>₱100 off only on app</p>
                        <p className='text-xs text-gray-500'>New customers only</p>
                    </div>
                </div>
                <Link 
                    className='flex items-center h-8 bg-gradient-to-r from-orange-500 to-pink-500 px-2 rounded-full text-white text-sm' 
                    to="/">Get App</Link>
        </div>
        <div className='h-12 flex justify-between items-center px-2'>
            <BackArrow className="p-1 z-10 w-8 h-8 cursor-pointer"/>
            <div className='flex items-center'>
                <CartBtn className={'my-1 mx-2 cursor-pointer w-7 h-7'}/>
                <ProductOptionBtn className="p-1 cursor-pointer w-7 h-7"/>
            </div>
        </div>
        </div>
    )
}
