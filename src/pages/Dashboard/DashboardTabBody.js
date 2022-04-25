import React, {useContext, useEffect, useState, useCallback} from 'react'
import {DashboardContext} from "../../context/DashboardContext";
import {getProductTabs} from "../../services/firebase";
import {ProductTemplate} from "../../components/ProductTemplate";
import tabs from "../../fixtures/dashboard-tabs.json";
export const DashboardTabBody = () => {
    const {
        activeTab,
        products, setProducts,
        lastItemId, setLastItemId,
        observerBody
    } = useContext(DashboardContext);
    
    const [hasMore, setHasMore] = useState(false);

    const lastItemRef = useCallback(node=>{
      if (observerBody.current) observerBody.current.disconnect();
      observerBody.current = new IntersectionObserver(entries=>{
        if (entries[0].isIntersecting && hasMore) {
            setLastItemId(node.id)
        } 
      });
      if (node) observerBody.current.observe(node)
    }, [hasMore, setLastItemId, observerBody]);

    useEffect(()=>{
        (async()=>{
            try {
                const data = await getProductTabs({filter:tabs[activeTab].filter, lastItemId});
                if (data) {
                    setHasMore(data.length > 0)
                    setProducts(prev=>[...prev, ...data]); 
                }
            } catch (error) {
                console.log(error);
            }
        })()
    }, [lastItemId, activeTab, setProducts]);


    return (
        <ul className='grid grid-cols-2 gap-4 px-4 mb-20'>
            {products.map((item, index)=>{
                if (index === products.length-1) {
                    return <ProductTemplate lastItemRef={lastItemRef} key={item.id} {...item}/>
                }
                return <ProductTemplate key={item.id} {...item}/>
            })}
        </ul>
    )
}
