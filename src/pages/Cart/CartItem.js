import React , {useState, useEffect} from 'react';
import { getBrandName, listenOnDocument, selectCartItem, setCartItemPrice} from "../../services/firebase";
import {currencyFormat} from "../../helpers/utils";
import {RoundedCheckBox} from "./RoundedCheckBox";
import {Link} from "react-router-dom";
import {ROUTES} from "../../constants/routes";
import {PlusMinusBtn} from "./PlusMinusBtn";
import {useDispatch} from "react-redux";
import {setMsgError} from "../../store/ErrorSlice";
import {setModalLazadaLoading} from "../../store/LoadingSlice";

export const CartItem = ({storeID, prodID, quantity, selected}) => {  
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [productData, setProductData] = useState(null);
    const [brandName, setBrandName] = useState("");
    const checkboxHandler = async({target})=>{
      try {
        dispatch(setModalLazadaLoading(true));
        await selectCartItem({prodID, selected: target.checked})
      } catch (error) {
        dispatch(setMsgError(error.message));
      }
      dispatch(setModalLazadaLoading(false));
    }
    useEffect(()=>{
      const unsub = listenOnDocument(`stores/${storeID}/products/${prodID}`, 
        setProductData,
        (val)=>dispatch(setMsgError(val))
      );
      return ()=>{
        unsub();
      }
    }, [storeID, prodID, dispatch])

    useEffect(()=>{
      (async()=>{
        try {
          if (productData && productData.price) {
            await setCartItemPrice({storeID, prodID, price: productData.price})
            const data = await getBrandName(productData.brand);
            setBrandName(data.brand_title || "No Brand");
            setIsLoading(false);
          }
        } catch (error) {
          dispatch(setMsgError(error.message))
        }
      })()
    }, [productData, storeID, prodID, dispatch]);


    if (isLoading) {
      return <></>
    }
    return (
      <li className='my-4 flex items-center'>
        <RoundedCheckBox checked={selected} onChange={checkboxHandler}/>
        <img 
          className='w-24 h-24 mr-4'
          src={productData.gallery[0]} alt={productData.item_name} 
        />
        <div>
          <p className='mb-2'>
            <Link 
              to={ROUTES.SINGLE_PRODUCT({storeID, prodID})}
              className='line-clamp-2 text-xs font-medium'
            >{productData.item_name}</Link>
          </p>
          <p className='text-xs text-gray-500 mb-4'>{brandName} ({productData.stock} stock/s left)</p>
          <div className='text-red-400 font-bold flex justify-between'>
            <p>{currencyFormat(productData.price)}</p>
            <p className='font-medium text-gray-500 inline-flex items-center'>
              <PlusMinusBtn storeID={storeID} prodID={prodID} stock={productData.stock} quantity={quantity}>
                <span className='px-2'>{quantity}</span>
              </PlusMinusBtn>
            </p>
          </div>
        </div>
      </li>
    )
}
