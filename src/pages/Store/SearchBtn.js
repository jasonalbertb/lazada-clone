import React, {useState} from 'react'
import {AiOutlineSearch} from "@react-icons/all-files/ai/AiOutlineSearch";
import {createPortal} from "react-dom";
import {SearchModal} from "./SearchModal";
export const SearchBtn = ({className}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <button onClick={()=>setIsModalOpen(true)}>
        <AiOutlineSearch className={className}/>
      </button>
      {(isModalOpen && createPortal(
        <SearchModal closeModal={()=>setIsModalOpen(false)}/>,
        document.body
      ))}
    </>
  )
}
