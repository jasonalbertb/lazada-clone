import React, {useEffect, useState} from 'react'
import {getReviews} from "../../services/firebase";
import {setIsError} from "../../store/ErrorSlice";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../constants/routes";
import {Link} from "react-router-dom";
import {SingleReview} from "./SingleReview";
export const ProductReview = ({storeID, prodID, reviewCnt})=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);
    useEffect(()=>{
        (async()=>{
            try {
                const data = await getReviews({storeID, prodID});
                if (!data) {
                    throw new Error("Resources not found");
                }
                setReviews(data);
            } catch (error) {
                dispatch(setIsError(error));
                navigate(ROUTES.ERR);
            }
        })()
    }, [dispatch, navigate, storeID, prodID])
    return (
        <div className='my-2 bg-white'>
            <div className='text-sm text-gray-500 flex justify-between px-4 py-2'>
                <span>Ratings and Reviews ({reviewCnt})</span>
                <Link className='text-xs italic text-red-500' to={ROUTES.DASHBOARD}>View All</Link>
            </div>
            <ul className='py-2'>
                {reviews.map(item=>{
                    return (
                        <SingleReview key={item.id} storeID={storeID} prodID={prodID}  reviewID={item.id}/>
                    )
                })}
            </ul>
        </div>
    )
}
