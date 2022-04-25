import React , {useState,useEffect, useContext, useRef} from 'react'
import { Link} from "react-router-dom";
import {ROUTES} from "../../constants/routes";
import {StoreContext} from "../../context/StoreContext";
import storeOptions from "../../fixtures/store-options.json";
import {useDispatch} from "react-redux";
import {setModalLazadaLoading} from "../../store/LoadingSlice";
//icons
import {HiChevronDown} from "@react-icons/all-files/hi/HiChevronDown";
import {HiChevronUp} from "@react-icons/all-files/hi/HiChevronUp";
import {FaThList} from "@react-icons/all-files/fa/FaThList";
import {RiLayoutGridFill} from "@react-icons/all-files/ri/RiLayoutGridFill";
import {AiOutlineShoppingCart} from "@react-icons/all-files/ai/AiOutlineShoppingCart";
import {FaCheckCircle} from "@react-icons/all-files/fa/FaCheckCircle";
//components
import {SearchBtn} from "./SearchBtn";
import {BackArrow} from "../../components/BackArrow";
import {FilterBtn} from "./FilterBtn";
import {ProductOptionBtn} from "../Products/ProductOptionBtn";
export const StoreHeader = () => {
  const dispatch = useDispatch();
  const ref = useRef();
  const {
    stickyFlag,
    listView, setListView,
    selectedSort, setSelectedSort
  } = useContext(StoreContext);
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);

  const closeModal = (e)=>{
    if (e.target === e.currentTarget) {
      setIsSortModalOpen(false);
    }
  }
  const btnhander = (index)=>{
    setSelectedSort(index);
    setIsSortModalOpen(false);
    dispatch(setModalLazadaLoading(true));
  }

  useEffect(()=>{
    document.body.style.overflowY = isSortModalOpen? "hidden" : "scroll";
  }, [isSortModalOpen])
  
  return (
    <div ref={ref}
      className={`sticky top-0 ${stickyFlag && "drop-shadow-md"} z-50`}
    >
      <div className='flex justify-between items-center p-2 border-b border-gray-100 bg-white'>
        <div className='flex items-center'>
          <BackArrow className="w-7 h-7 px-1"/>
          All Products
        </div>
        <div className='flex items-center'>
          <SearchBtn className='w-5 h-5'/>
          <Link to={ROUTES.CART}>
              <AiOutlineShoppingCart 
              className='p-1 mx-2 cursor-pointer w-7 h-7'
              />
          </Link>
          <ProductOptionBtn className="p-1 cursor-pointer w-7 h-7"/>
        </div>
      </div>
      <div className={`flex justify-between items-center bg-white ${isSortModalOpen && "drop-shadow-lg"}`}>
        <div>
          <button 
            onClick={()=>{
              setIsSortModalOpen(prev=>!prev);
            }}
            className='px-4 py-2 inline-flex items-center'
          >
            <span>{storeOptions[selectedSort].title} </span>
            {isSortModalOpen? 
              <HiChevronUp className='mx-2 w-5 h-5'/>:
              <HiChevronDown className='mx-2 w-5 h-5'/>}
            
          </button>
        </div>
        <div className='flex items-center'>
          <FilterBtn className='px-4 py-2'/>
          <button 
            onClick={()=>setListView(prev=>!prev)}
            className='p-2 border border-gray-100'
          >
            {(listView? 
              <FaThList className='w-6 h-6' />:
              <RiLayoutGridFill  className='w-6 h-6'/>
            )}
          </button>
        </div>
      </div>
      {(isSortModalOpen && 
        <div 
          onClick={closeModal}
          className='w-screen h-screen bg-black-rgba-light'>
            <ul className='bg-white text-gray-600'>
              {storeOptions.map((item, i)=>{
                return(
                  <li className='px-4 py-3 border-t flex justify-between items-center '>
                    <button 
                      className={`${selectedSort===i && "text-orange-500"}`}
                      onClick={()=>btnhander(i)}
                    >{item.title}</button>
                    {selectedSort===i && <FaCheckCircle className='text-orange-500 w-5 h-5'/>}
                  </li>
                ) 
              })}
            </ul>
        </div>
      )}
      
    </div>
  )
}
