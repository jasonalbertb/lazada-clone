import React, {useState, useEffect, useContext} from 'react'
import {FaChevronDown} from "@react-icons/all-files/fa/FaChevronDown";
import {FaChevronUp} from "@react-icons/all-files/fa/FaChevronUp";
import {StoreContext} from "../../../context/StoreContext";
import {getCollectionData} from "../../../services/firebase";
import {Category} from "./Category";
export const FilterModal = ({closeModal}) => {
  const [expanded, setExpanded] = useState(false);
  const {storeID} = useContext(StoreContext);
  const [categories, setCategories] = useState([]);
  useEffect(()=>{
    (async()=>{
      const data = await getCollectionData(`stores/${storeID}/category`);
      setCategories(data);
    })()
  }, [storeID])
  return (
    <div
      onClick={closeModal} 
      className='fixed top-0 left-0 w-screen h-screen bg-black-rgba z-[100]'>
      <div className='absolute right-0  top-0 w-3/4 bg-white h-screen animate-slide px-2 py-4'>
          <p className='flex justify-between items-center'>
            <span className='text-sm text-gray-500'>Category</span> 
            <button 
              className='text-gray-500'
              onClick={()=>setExpanded(prev=>!prev)}
            >
              {expanded? <FaChevronUp className='w-4 h-4'/>: <FaChevronDown className='w-4 h-4'/>}
            </button>
          </p>
          <p className={`${!expanded && "line-clamp-3"} border-b`}>
            {categories.map(item=> <Category {...item}/>)}
          </p>
      </div>
    </div>
  )
}
