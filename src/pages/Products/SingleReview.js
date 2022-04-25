import React, {useEffect, useState} from 'react'
import {getSingleReview, getUserDataById} from "../../services/firebase";
import Skeleton from "react-loading-skeleton";
import {formatTimestampDate} from "../../helpers/utils";
import {Rating} from "../../components/Rating";
import {ReviewImgGallery} from "./ReviewImgGallery";
export const SingleReview = ({storeID, prodID, reviewID}) => {
    const [reviewData, setReviewData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=>{
        (async()=>{
            const data = await getSingleReview({storeID, prodID, reviewID});
            if (data && data.reviewerID) {
                const rData = await getUserDataById(data.reviewerID);
                if (rData) {
                    setReviewData({review: data, reviewer: rData});
                    setIsLoading(false);
                }
            }
        })()
    }, [storeID, prodID, reviewID])

    if (isLoading) {
        return (
            <div className='w-full h-16 leading-none mb-2 overflow-hidden'>
                <Skeleton width={"100%"} height={"100%"}/>
            </div>
        )
    }
    return (
        <li className='border-b px-4 pb-4'>
            <div className='flex justify-between items-center mb-1'>
                <span className='text-[10px] text-gray-400'>
                    {reviewData.reviewer.name} {formatTimestampDate(reviewData.review.createdAt)}
                </span>
                <Rating 
                    rating={reviewData.review.rating} 
                    className="w-3 h-3 text-yellow-400 inline"
                />
            </div>
            <div className='text-xs line-clamp-3'>
                {reviewData.review.review}
            </div>
            {(reviewData.review.photo 
                && reviewData.review.photo.length > 0
                && <ReviewImgGallery gallery={reviewData.review.photo}/>)}
        </li>
    )
}
