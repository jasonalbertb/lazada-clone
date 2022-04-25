import React from 'react'
import {PICS} from "../constants/pics";
import {useNavigate} from "react-router-dom";
import {currencyFormat} from "../helpers/utils";
import {ROUTES} from "../constants/routes";
import {ItemsLeftBar} from "./ItemsLeftBar"; 
export const FlashProductTemplate = ({id, gallery, price, sold, stock, storeID}) => {
    const navigate = useNavigate();
    const handleClick = ()=>{
        navigate(ROUTES.SINGLE_PRODUCT({storeID, prodID:id}))
    } 
    return (
        <li 
            onClick={handleClick}
            className='flex flex-col rounded-lg border overflow-hidden bg-white'>
            <img 
                alt='preview-product'
                src={gallery.length > 0? gallery[0]: PICS.DEFAULT_ITEM}
            />
            <p className='flex items-center p-1'> 
                <span className='font-bold text-red-500'>{currencyFormat(price)}</span>
            </p>
            <ItemsLeftBar stock={stock} sold={sold}/>
        </li>
    )
}
