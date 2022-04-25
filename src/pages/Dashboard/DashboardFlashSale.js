import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom";
import {ROUTES} from "../../constants/routes";
import {FiChevronRight} from "@react-icons/all-files/fi/FiChevronRight";
import {getProducts} from "../../services/firebase";
import {FlashProductTemplate} from "../../components/FlashProductTemplate";
import {limit} from "firebase/firestore";
export const DashboardFlashSale = ({flashSaleRef}) => {
  const [products, setProducts] = useState([]);
  
  useEffect(()=>{
    (async()=>{
      const data = await getProducts(limit(3));
      setProducts(data);
    })()
  }, []);
  return (
    <div ref={flashSaleRef} className='p-3'>
      <div className='flex justify-between'>
        <img 
          className='h-5'
          alt='lazmall-icon'
          src='https://lzd-img-global.slatic.net/g/gcp/lazada/927638f2-eeaf-4f7f-9470-249d7ef1d5ed_PH-252-54.png_200x200q80.jpg_.webp'
        />
        <Link to={ROUTES.FLASHSALE} className="uppercase text-sm flex items-center">
          Show More <FiChevronRight />
        </Link>
      </div>
      <ul className='grid grid-cols-3 gap-2 p-2'>
        {products.map(item=>{
          return <FlashProductTemplate key={item.id} {...item}/>
        })}   
      </ul>
    </div>
  )
}
