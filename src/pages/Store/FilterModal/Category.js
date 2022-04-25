import React, {useState, useEffect, useContext} from 'react'
import {getDocumentData} from "../../../services/firebase";
import {StoreContext} from "../../../context/StoreContext";
import {FaWindowClose} from "@react-icons/all-files/fa/FaWindowClose";
import {useDispatch} from "react-redux";
import {setModalLazadaLoading} from "../../../store/LoadingSlice";
export const Category = ({name}) => {
    const dispatch = useDispatch();
    const [categoryName, setCategoryName] = useState("");
    const {selectedCategory, setSelectedCategory} = useContext(StoreContext);
    const bthHandler = ()=>{
        setSelectedCategory(name);
        dispatch(setModalLazadaLoading(true))
    }
    useEffect(()=>{
       (async()=>{
            const data = await getDocumentData(name);
            if (data) {
                setCategoryName(data.name)
            }
       })()
    }, [name])
    return (
        <span className='relative inline-block'>
            <button
                onClick={bthHandler} 
                className={`${selectedCategory === name? "border border-orange-500 bg-orange-50 text-orange-500": "bg-gray-100"}  
                    rounded-sm mx-2 my-1 px-3 py-2 text-xs `}
            >{categoryName}</button>
            {selectedCategory === name && <FaWindowClose className='w-3 h-3 absolute bottom-1 right-2 text-orange-500'/>}
        </span>
    )
}
