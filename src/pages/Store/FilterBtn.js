import React, {useState} from 'react'
import {VscFilter} from "@react-icons/all-files/vsc/VscFilter";
import {createPortal} from "react-dom";
import {FilterModal} from "./FilterModal";
export const FilterBtn = ({className}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = (e)=>{
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  }

  return (
    <>
      <button 
        className={className}
        onClick={()=>setIsModalOpen(true)}
      ><VscFilter className='inline'/> Filter 
      </button> 
      {(isModalOpen && createPortal(
        <FilterModal closeModal={closeModal}/>,
        document.body
      ))}
    </>
  )
}
