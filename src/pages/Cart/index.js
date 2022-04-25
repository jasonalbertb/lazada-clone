import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {HiArrowLeft} from  "@react-icons/all-files/hi/HiArrowLeft";
import {StoreCart} from "./StoreCart";
import {FaMapMarkerAlt} from "@react-icons/all-files/fa/FaMapMarkerAlt";
import {FaChevronRight} from "@react-icons/all-files/fa/FaChevronRight";
import {CartFooter} from "./CartFooter";
import {listenToCollection, deleteSelectedCartItems} from "../../services/firebase";
import {CartContext} from "../../context/CartContext";
import {mapCartItems} from "../../helpers/utils";
import {useDispatch} from "react-redux";
import {setModalLazadaLoading} from "../../store/LoadingSlice";
import {setMsgError} from "../../store/ErrorSlice";
//firebase
import {getAuth} from "firebase/auth";
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartStores, setCartStores] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const [selectedCount, setSelectedCount] = useState(0);
  const [shipping_fee, setShipping_fee] = useState(0);
  const deleteHandler = async()=>{
    try {
      dispatch(setModalLazadaLoading(true))
      await deleteSelectedCartItems();
    } catch (error) {
      dispatch(setMsgError(error.message))
    }
    dispatch(setModalLazadaLoading(false))
  }

  useEffect(()=>{
    let unsubscribe;
    const user = getAuth().currentUser;
    if (user && user.uid) {
      unsubscribe = listenToCollection(
        `users/${user.uid}/cart`, 
        (val)=>{
          const selectedItems = val.filter(item=>item.selected===true);
          setShipping_fee(0)
          setSubtotal(selectedItems.reduce((total, curr)=> total+(curr.price*curr.quantity), 0))
          setSelectedCount(selectedItems.length);
          setAllSelected(val.length > 0 && val.reduce((flag, curr)=> flag&&curr.selected, true))
          setCartStores(mapCartItems(val))
        }, 
        (val)=>dispatch(setMsgError(val))
      );
    }
    return ()=>{
      unsubscribe && unsubscribe();
    }
  }, [dispatch])

  return (
    <CartContext.Provider
      value={{
        allSelected,
        subtotal, 
        selectedCount,
        shipping_fee
      }}
    >
      <nav className='flex items-center h-12 justify-between bg-white fixed top-0 left-0 z-50 px-4 w-full border-b'>
        <div className='flex items-center'>
          <button onClick={()=>navigate(-1)} className="mr-2">
            <HiArrowLeft className='w-6 h-6'/>
          </button>
          Cart
        </div>
        <div>
          <button onClick={deleteHandler}>Delete</button>
        </div>
      </nav>
      <div className='mt-12 mb-20 p-6'>
        <p className='flex items-center text-xs mb-4'>
          <FaMapMarkerAlt className='w-3 h-3 mr-2 text-sky-500'/>
          Add Shipping Address
          <FaChevronRight className='w-3 h-3 mx-2 text-gray-500'/>
        </p>
        
        {cartStores.map((item, i)=>{
          return <StoreCart key={i} {...item}/>
        })}
      </div>
      <CartFooter />
    </CartContext.Provider>
  )
}

export default Cart