import React,{useEffect, useState} from 'react';
import {SubmitBtn} from "./SubmitBtn";
import {InputText} from "./InputText";
import {addToCollection} from "../services/firebase"
export const AddBrands = () => {
    const [brand_title, setBrand_title] = useState("");
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const handleSubmit = async(e)=>{
       try {
        e.preventDefault();
        setIsSubmitDisabled(true)
        await addToCollection("brands", {
            brand_title
        })
        setBrand_title("");
       } catch (error) {
           console.log(error);
       }
       setIsSubmitDisabled(false)
    }
    useEffect(()=>{
        setIsSubmitDisabled(!brand_title);
    },[brand_title])
    return (
        <form onSubmit={handleSubmit} className="border p-2 my-4">
            <div className='font-bold'>Add Brand</div>
            <InputText label="brand_title" value={brand_title} setValue={setBrand_title}/>
            <SubmitBtn disabled={isSubmitDisabled}/>
        </form>
    )
}
