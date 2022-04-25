import React from 'react'
import {InputContainer} from "./InputContainer";
import {Label} from "./Label";
export const InputOption = ({label, value, setValue, values, field}) => {
  return (
    <InputContainer>
        <Label>{label}</Label>
        <select 
            onChange={(e)=>setValue(JSON.parse(e.target.value))}
        >
            {values.map((item, i)=>{
                return <option key={i} selected={item===value} 
                    value={JSON.stringify(item)}>{item[field]}
                </option>
            })}
        </select>
    </InputContainer>
  )
}