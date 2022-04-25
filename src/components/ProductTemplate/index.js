import React, {useState, useEffect} from 'react'
import {PICS} from "../../constants/pics";
import {currencyFormat} from "../../helpers/utils";
import { getVouchers} from "../../services/firebase";
import {Loading} from "./Loading";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../constants/routes";
import {FreeShippingTag} from "../FreeShippingTag";
import {AiFillStar} from "@react-icons/all-files/ai/AiFillStar";
import {Tags} from "../../components/Tags";
export const ProductTemplate = ({lastItemRef ,id, item_name, gallery, price, storeID, rating=1, reviewCount, listView}) => {
  const navigate = useNavigate();
  const [isLoading,setIsLoading] = useState(true);
  const [isVoucher, setIsVoucher] = useState(false);
  const handleClick = ()=>{
    navigate(ROUTES.SINGLE_PRODUCT({storeID, prodID:id}))
} 
  useEffect(()=>{
    (async()=>{
      setIsVoucher(await getVouchers(storeID));
      setIsLoading(false);
    })() 
  }, [storeID])
  if (isLoading) {
    return <Loading />
  }
  return (
    <li 
      ref={lastItemRef} id={`${storeID}_${id}`}
      onClick={handleClick}
      className={`${listView && "flex"} border rounded-lg overflow-hidden mt-4 bg-white`}>
        <img 
          className={`${listView && "w-2/5"}`}
          src={gallery.length > 0? gallery[0]: PICS.DEFAULT_ITEM} 
          alt="preview-product"
        />
      
        <div className={`p-2 ${listView && "flex flex-col justify-between"}`}>
          <div>
            <p className='line-clamp-2 text-ellipsis font-medium'>
                <Tags storeID={storeID}/>
                <span className='text-sm'> {item_name}</span>
            </p>
            <p>
              <span 
                className='text-lg text-red-500 font-medium'
              >{currencyFormat(price)}</span>
            </p>
            <p>{isVoucher && <FreeShippingTag />}</p>
          </div>
          <div>
            <p className='text-xs font-medium'><AiFillStar className='text-yellow-300 inline w-3 h-3'/> {rating} <span className='text-gray-400'>({reviewCount})</span></p>
          </div>
        </div>
    </li>
  )
}
