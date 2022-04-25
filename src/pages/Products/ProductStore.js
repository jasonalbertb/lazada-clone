import React, {useState, useEffect} from 'react'
import {getStoreData, checkIfLazmall} from "../../services/firebase";
import Skeleton from "react-loading-skeleton";
import {setIsError} from "../../store/ErrorSlice";
import {useNavigate, Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {ROUTES} from "../../constants/routes";
import {PICS} from "../../constants/pics";
import {FollowBtn} from "../../components/FollowBtn";
export const ProductStore = ({storeID}) => {
    const navigate =useNavigate();
    const dispatch = useDispatch();
    const [isLazmall, setIsLazmall] = useState(false);
    const [storeData, setStoreData] = useState(null);
    const [isLoading , setIsLoading] = useState(true);
    useEffect(()=>{
      (async()=>{
        try {
          const data = await getStoreData(storeID);
          if (!data) {
            throw new Error("Resource not found");
          }
          const flag = await checkIfLazmall(storeID);
          setIsLazmall(flag)
          setStoreData(data);
          setIsLoading(false);
        } catch (error) {
          dispatch(setIsError(error));
          navigate(ROUTES.ERR);
        }
      })()
    }, [storeID, navigate, dispatch])
    if (isLoading) {
      return (
        <div className='w-full h-20 leading-none overflow-hidden'>
          <Skeleton width={"100%"} height={"100%"}/>
        </div>
      )
    }
    return (
      <div className='bg-white p-4'> 
        <div className='flex w-full justify-between items-center'>
          <div className='flex items-center'>
            <img 
              className='w-10 h-10 object-cover object-center'
               src={storeData.logo || PICS.DEFAULT_STORE} alt={storeData.store_name}
            /> 
            <p className='px-2'>
              {storeData.store_name}
              {isLazmall && <img className='h-3'
                alt={storeData.store_name} src='https://lzd-img-global.slatic.net/g/tps/tfs/TB1tot9TqL7gK0jSZFBXXXZZpXa-141-42.png_200x200q80.jpg_.webp'/>} 
            </p>
          </div>
          <FollowBtn 
            className="inline-flex items-center text-xs text-orange-500 px-3 border border-orange-500 rounded-md h-6" 
            storeID={storeID} />
        </div>
        <div className='text-center'>
          <Link 
            to={ROUTES.STORE(storeID)}
            className=' text-xs text-red-500 italic'
          >Visit Store</Link>
        </div> 
      </div>
    )
}
