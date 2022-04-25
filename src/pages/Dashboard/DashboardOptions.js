import React from 'react'
import dashboardOptions from "../../fixtures/dashboard-options";
import {Link} from "react-router-dom";

export const DashboardOptions = () => {
  return (
    <ul className='grid grid-cols-5 p-4 gap-2'>
      {dashboardOptions.map((option, i)=>{
        const {title, img, link} = option; 
        return (
          <li key={i}>
            <Link to={link}>
              <img src={img} alt="title"/>
              <p className='text-center leading-none text-xs'>{title}</p>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
