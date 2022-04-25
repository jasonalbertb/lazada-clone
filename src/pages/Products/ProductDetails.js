import React from 'react'
import {Rating} from "../../components/Rating";
import {currencyFormat} from "../../helpers/utils";
import {Tags} from "../../components/Tags";
export const ProductDetails = ({storeID, product}) => {
    return (
        <div>
            <div className='bg-white p-2'>
                <p className='text-2xl text-orange-500 font-bold p-2'>{currencyFormat(product.price)}</p>
                <p className='line-clamp-3'> 
                    <Tags storeID={storeID}/> {product.item_name}
                </p>
                <p className=''>
                    <Rating rating={product.rating} maxRating={5} className="w-3 h-3 text-yellow-400 inline"/> 
                    <span className='px-1 text-gray-500 text-sm'>{product.rating}</span>
                </p>
            </div>
            <div className='my-2 text-sm'>
                <div className='flex bg-white mb-2 items-center'>
                    <div className='w-1/3 text-gray-500 px-4 py-2'>Specifications</div>
                    <div className='text-xs text-gray-700'>Brand, Model, Warranty Type</div>
                </div>
                <div className='flex bg-white mb-2 items-center'>
                    <div className='w-1/3 text-gray-500 px-4 py-2'>Installemnt</div>
                    <div className='text-xs text-gray-700'>Up to {product.installment.months} months as low as {currencyFormat(product.price/product.installment.months)}</div>
                </div>
            </div>
        </div>
    )
}
