import React, {useState, useRef, useEffect} from 'react'
import {FiSearch} from "@react-icons/all-files/fi/FiSearch"
import {DashboardTabHeader} from "../DashboardTabHeader";
import {listenToSearchHistory, clearSearchHistory, addSearchHistory} from "../../../services/firebase";
import {onAuthStateChanged, getAuth } from "firebase/auth";
import {BsTrash} from "@react-icons/all-files/bs/BsTrash";
import {useDispatch} from "react-redux";
import {setMsgError} from "../../../store/ErrorSlice";
import {setModalLazadaLoading} from "../../../store/LoadingSlice";
export const DashboardSearch = ({stickyFlag, stickyFlashSale}) => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchHistory, setSearchHistory] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const ref = useRef();
    const closeModal = (e)=>{
        if (e.target === e.currentTarget) {
            setIsModalOpen(false);
        }
    }
    const submitHandler = async(e)=>{
        e.preventDefault();
        setSubmitDisabled(true);
        dispatch(setModalLazadaLoading(true));
        try {
            await addSearchHistory(searchInput);
        } catch (error) {
            dispatch(setMsgError(error.message));
        }
        dispatch(setModalLazadaLoading(false));
        setSearchInput("");
    }
    const deleteHandler = async()=>{
        try {
            dispatch(setModalLazadaLoading(true));
            await clearSearchHistory();
        } catch (error) {
            dispatch(setMsgError(error.message));
        }
        dispatch(setModalLazadaLoading(false));
    }
    useEffect(()=>{
        setSubmitDisabled(searchInput ==="");
    }, [searchInput]);
    useEffect(()=>{
        document.body.style.overflowY = isModalOpen ? 'hidden' : 'scroll'
    }, [isModalOpen])
    useEffect(()=>{
        let unsubscribe;
        const unsub = onAuthStateChanged(getAuth(), user=>{
            if (user) {
                unsubscribe = listenToSearchHistory(user, 
                    setSearchHistory, 
                    val=>dispatch(setMsgError(val))
                )
            }
        })
        return ()=>{
            unsubscribe && unsubscribe();
            unsub();
        }
    }, [dispatch])
    useEffect(()=>{
        if (ref && ref.current) {
            const element = ref.current;
            const listener = ()=>{
                setIsModalOpen(true);
                ref.current.scrollIntoView();
            }
            element.addEventListener('focus', listener);
            return ()=>{
                element.removeEventListener("focus" ,listener);
            } 
        }
    }, [ref])

    return (
        <div className={`${stickyFlag &&"drop-shadow-lg"} sticky top-0 z-50`}>
            <div className={`px-4 py-3 ${stickyFlashSale && "pb-0"} bg-white`}>
                <form 
                    onSubmit={submitHandler}
                    className={`border p-1 h-10 border-red-500 rounded-full flex items-center overflow-hidden searchForm`}
                >  
                    <FiSearch className='w-8 h-8 text-gray-300 ml-3 mr-1'/>
                    <input 
                        ref={ref}
                        value={searchInput} onChange={(e)=>setSearchInput(e.target.value)}
                        className='block focus:outline-none w-full'
                        placeholder='Search in lazada' type="text"
                    />
                    <button 
                        disabled={submitDisabled}
                        className={`text-white py-1 px-3 rounded-full
                                    bg-gradient-to-r from-red-400 to-orange-400
                                `} 
                        type='submit'
                    >Search</button>
                </form>
                {stickyFlashSale && !isModalOpen &&  <DashboardTabHeader  icon={false} className="py-1"/>}
            </div>
            
            {(isModalOpen && 
                <div 
                    onClick={closeModal}
                    className='w-screen h-screen bg-black-rgba-light'
                >
                    <div className='w-full px-4 py-2 bg-white'>
                        <p className='flex justify-between items-center'>
                            <span>Search History</span>
                            <button onClick={deleteHandler}>
                                <BsTrash className='w-5 h-5 text-gray-500'/>
                            </button>
                        </p>
                        <ul className='flex py-2'>
                            {searchHistory.map(item=>{
                                return(
                                    <li className='rounded-full border border-gray-200 mx-2 text-gray-500 px-2 py-1 bg-gray-50'>
                                        {item.content}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    
                </div>
            )}
        </div>
    )
}
