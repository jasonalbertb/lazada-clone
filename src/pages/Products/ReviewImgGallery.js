import React from 'react'
import {ImageViewer} from "../../components/ImageViewer";
export const ReviewImgGallery = ({gallery}) => {
  return (
    <div className='grid grid-cols-5 w-full overflow-hidden py-1'>
      {gallery.map((item, i)=>{
        return <ImageViewer className='w-16 h-16 object-cover object-center' src={item} alt={`img-${i}`}/>
      })}
    </div>
  )
}
