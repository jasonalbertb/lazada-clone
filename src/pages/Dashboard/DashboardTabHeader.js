import React, {useContext, useRef} from 'react'
import dashboardTabs from "../../fixtures/dashboard-tabs.json";
import {DashboardContext} from "../../context/DashboardContext";
export const DashboardTabHeader = ({icon, className}) => {
    const {
        activeTab, setActiveTab,
        setProducts, setLastItemId, observerBody, scrollTop
    } = useContext(DashboardContext);
    const handleClick = async(i)=>{
            setLastItemId(null);
            setProducts([]);
            if (observerBody.current) observerBody.current.disconnect();
            setActiveTab(i);
    }
    return (
        <div className={` relative overflow-x-scroll overflow-y-hidden hide-scroll pb-2 ${className} px-2`}>
            <ul className={`whitespace-nowrap`}>
                {dashboardTabs.map((item, i)=>{
                    return (
                        <li
                            onClick={()=>handleClick(i)}
                            key={i} 
                            className={`items-center inline-block text-center align-top px-4 relative
                                        ${i!==0 && "before:content[' '] before:absolute before:left-0 before:top-1/2 before:translate-y-[-50%] before:w-[1px] before:h-1/2 before:bg-gray-300"}
                                        ${activeTab === i && "after:content[' '] after:rounded-full after:absolute after:bottom-[-4px] after:left-1/2 after:translate-x-[-50%] after:w-1/2  after:h-1 after:bg-blue-500"}`}>
                            {icon && <img src={item.img} alt={item.title} className="h-7 align-bottom inline-block m-auto "/>}
                            <p className='block text-sm'>{item.title}</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
