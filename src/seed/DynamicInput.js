import React, {useState, useEffect} from 'react'
import {changeHandler} from "./utils";
export const DynamicInput = ({value, setValue, label}) => {
    const [inputText, setInputText] = useState("");
    const [isBtnDisabled, setIsBtnDisabled] = useState(true);
    const clickHandler = ()=>{
        setValue(prev=>[...prev, inputText]);
        setInputText("");
        setIsBtnDisabled(true);
    }
    useEffect(()=>{
        setIsBtnDisabled(inputText === "");
    }, [inputText])
    return (
        <div className='my-1 bg-gray-100 p-1 border-2'>
            <div className='text-sm font-bold bg-gray-100 p-1 my-1'>{label}</div>
            <ul className='border bg-white'>
                {value.map((item, i)=>{
                    return(
                        <li className='' key={i}>{item}</li>
                    )
                })}
            </ul>
            <div className='flex py-1'>
                <input type="text" className='border flex-1 px-1 focus:outline-none' 
                    value={inputText} 
                    onChange={changeHandler(setInputText)}
                />
                <button
                    disabled={isBtnDisabled}
                    onClick={clickHandler}
                    className='border text-xs font-semibold px-2 bg-white py-1 disabled:text-gray-500'
                >Add</button>
            </div>
        </div>
    )
}
