import React from 'react'
import {ImSpinner8} from "@react-icons/all-files/im/ImSpinner8";
export const Spinner = ({className}) => {
  return (
    <span className={`animate-spin inline ${className}`}>
        <ImSpinner8 />
    </span>
  )
}
