import React, {useContext, useEffect, useState} from 'react'
import {ProductTemplate} from "../../components/ProductTemplate";
import {StoreContext} from "../../context/StoreContext";
import {getCollectionData} from "../../services/firebase";
import {useDispatch} from "react-redux";
import {setMsgError} from "../../store/ErrorSlice";
import {setModalLazadaLoading} from "../../store/LoadingSlice";
import storeOptions from "../../fixtures/store-options.json";
import {orderBy, where} from "firebase/firestore";
export const StoreProducts = () => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const {listView, selectedSort, storeID,selectedCategory} = useContext(StoreContext);
    useEffect(()=>{
        (async()=>{
            try {
                let {sortBy} = storeOptions[selectedSort];
                let modifier = [];
                if (selectedCategory) {
                    modifier.push(where("category", "==", selectedCategory));
                }
                if (sortBy === "asc") {
                    modifier.push(orderBy("price"))
                }else if(sortBy === "desc"){
                    modifier.push(orderBy("price", "desc"))
                }
                const data = await getCollectionData(`stores/${storeID}/products`, ...modifier);
                if (data) {
                    setProducts(data);
                }
            } catch (error) { 
                console.log(error);
                dispatch(setMsgError(error.message));
            }
            dispatch(setModalLazadaLoading(false));
        })()
    }, [storeID, dispatch, selectedSort, selectedCategory]);

    return (
        <ul className={`${!listView && "grid grid-cols-2 gap-2"} p-2 bg-gray-100`}>
            {products.map(item=>{
                return(
                   <ProductTemplate key={item.id} {...item} listView={listView}/>
                )
            })}
        </ul>
    )
}
