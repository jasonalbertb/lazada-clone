import React, {useRef, useState, useCallback, useEffect} from 'react'
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {ROUTES} from "../../constants/routes";
import {setIsError} from "../../store/ErrorSlice";
import {getStoreData, checkIfLazmall } from "../../services/firebase";

//components
import {AppBanner} from "../../components/AppBanner";
import {StoreHeader} from "./StoreHeader";
import {StoreContext} from "../../context/StoreContext";
import {StoreBanner} from "./StoreBanner";
import {ReactLoader} from "../../components/loading/ReactLoader";
import {StoreProducts} from "./StoreProducts";
const Store = () => {
    const {id:storeID} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [stickyFlag, setStickyFlag] = useState(false);  
    const [listView, setListView] = useState(false);
    const [storeData, setStoreData] = useState(null);
    const [isLazmall, setIsLazmall] = useState(false);
    const [selectedSort, setSelectedSort] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState("");

    const observer = useRef();
    const bannerRef = useCallback(node=>{
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries=>{
            setStickyFlag (!entries[0].isIntersecting);
        });
        if (node) observer.current.observe(node)
    }, []);

    useEffect(()=>{
        (async()=>{
            try {
                const data = await getStoreData(storeID);
                if (!data) {
                    throw new Error("Resource not found");
                } 
                const flag = await checkIfLazmall(storeID);
                setStoreData(data);
                setIsLazmall(flag);
                setIsLoading(false);
            } catch (error) {
                dispatch(setIsError(error));
                navigate(ROUTES.ERR);
            }
        })()
    }, [storeID, navigate, dispatch]);

    if (isLoading) {
        return <ReactLoader />
    }
    return (
        <StoreContext.Provider
            value={{
                storeID,
                stickyFlag,
                listView, setListView,
                storeData, isLazmall,
                selectedSort, setSelectedSort,
                selectedCategory, setSelectedCategory
            }}
        >
            <div ref={bannerRef}>
                <AppBanner />
            </div>  
            <StoreHeader />
            <StoreBanner />
            <StoreProducts/>
            <div className='h-screen bg-gray-100'></div>
        </StoreContext.Provider>
    )
}

export default Store