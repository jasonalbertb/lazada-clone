import React, {useState, useRef, useCallback} from 'react';
//components
import {DashboardOptions} from "./DashboardOptions";
import {DashboardFooter} from "./DashboardFooter";
import {DashboardFlashSale} from "./DashboardFlashSale";
import {DashboardTabBody} from "./DashboardTabBody";
import {AppBanner} from "../../components/AppBanner";
import { DashboardSearch} from "./DashboardSearch";
import {DashboardTabHeader} from "./DashboardTabHeader";
//context 
import { DashboardContext} from "../../context/DashboardContext"; 

const Dashboard = () => {
    const [stickyFlag, setStickyFlag] = useState(false);
    const [stickyFlashSale, setStickyFlashSale] = useState(false);
    const [activeTab, setActiveTab] = useState(0);  
    const [products, setProducts] = useState([]);
    const [lastItemId, setLastItemId] = useState(null);
    const observerBody = useRef();

    const observer = useRef();
    const bannerRef = useCallback(node=>{
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries=>{
            setStickyFlag (!entries[0].isIntersecting);
        });
        if (node) observer.current.observe(node)
    }, []);

    const observerTab = useRef();
    const flashSaleRef = useCallback(node=>{
        if (observerTab.current) observerTab.current.disconnect();
        observerTab.current = new IntersectionObserver(entries=>{
            setStickyFlashSale(!entries[0].isIntersecting);
        },{threshold: 0.5});
        if (node) observerTab.current.observe(node)
    }, []);

    return (
        <DashboardContext.Provider
            value={{
                activeTab, setActiveTab,
                products, setProducts,
                lastItemId, setLastItemId,
                observerBody, 
            }}
        >
        <div className='bg-white'>
            <div ref={bannerRef}> 
                <AppBanner />
            </div>
            <DashboardSearch stickyFlag={stickyFlag} stickyFlashSale={stickyFlashSale}/>
            <DashboardOptions />
            <DashboardFlashSale flashSaleRef={flashSaleRef}/>
            {!stickyFlashSale &&  <DashboardTabHeader  icon={true}/>}
            <DashboardTabBody />
            <DashboardFooter />
        </div>
        </DashboardContext.Provider>
    )
}

export default Dashboard



