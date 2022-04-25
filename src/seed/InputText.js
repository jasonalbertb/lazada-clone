import React from 'react'
import {Label} from "./Label";
import {InputContainer} from "./InputContainer";
export const InputText = ({label, value, setValue, type="text"}) => {
  const changeHandler = e=>{
    setValue(e.target.value)
  }
  return (
    <InputContainer>
      <Label>{label}</Label>
      <input type={type} className='border focus:outline-none' 
            value={value} onChange={changeHandler}/>
    </InputContainer>
  )
}
