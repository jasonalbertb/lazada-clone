import React, {useEffect, useState} from 'react';
import {getStoreData} from "../../services/firebase";
import {CartItem} from "./CartItem";
import {FiChevronRight} from "@react-icons/all-files/fi/FiChevronRight";
import {ROUTES} from "../../constants/routes";
import {Link} from "react-router-dom";
import {selectStore} from "../../services/firebase";
import {RoundedCheckBox} from "./RoundedCheckBox";
import {Tags} from "../../components/Tags";
import {useDispatch} from "react-redux";
import {setMsgError} from "../../store/ErrorSlice";
import {setModalLazadaLoading} from "../../store/LoadingSlice";

export const StoreCart = ({storeID, cartItems}) => {
  const dispatch = useDispatch();
  const [storeData, setStoreData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const checkboxHandler = async({target})=>{
    try {
      dispatch(setModalLazadaLoading(true))
      await selectStore({storeID, selected: target.checked})
    } catch (error) {
      dispatch(setMsgError(error.message))
    }
    dispatch(setModalLazadaLoading(false))
  }

  useEffect(()=>{
    (async()=>{
      try {
        const data = await getStoreData(storeID);
        setStoreData(data);
        setIsLoading(false)
      } catch (error) {
        dispatch(setMsgError(error.message))
      }
    })()
  }, [storeID, dispatch]);
  if (isLoading) {
    return <></>
  }
  return (
    <div className='border-b-2 my-8'>
      <div className='flex items-center'>
          <RoundedCheckBox 
            checked={cartItems.reduce((flag, curr)=>flag=flag&&curr.selected , true)} 
            onChange={checkboxHandler}/>
          <Link to={ROUTES.STORE(storeID)} className="inline-flex items-center">
            <Tags storeID={storeID}/>
            <span className='px-2 font-bold'>{storeData.store_name}</span>
            <FiChevronRight />
          </Link>
      </div>
      <ul>
        {cartItems.map(item=>{
          return <CartItem {...item}/>
        })}
      </ul>
    </div>
  )
}
