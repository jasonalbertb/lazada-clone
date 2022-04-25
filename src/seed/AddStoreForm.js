import React, {useEffect, useState} from 'react'
import {getMainCategories} from "./utils";
import {InputText} from "./InputText";
import {Loading} from "./Loading";
import {InputOption} from "./InputOption";
import {SubmitBtn} from "./SubmitBtn";
import {addToCollection} from "../services/firebase";
export const AddStoreForm = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [store_name, setStore_name] = useState("");
    const [categories, setCategories] = useState([]);
    const [main_category, setMain_category] = useState("");
    const [submitDisabled,setSubmitDisabled] = useState(true);
    const [logo, setLogo] = useState("");
    const [bg_banner, setBg_banner] = useState("");
    const submitHandler = async(e)=>{
        try {
            e.preventDefault();
            await addToCollection("stores" ,{
                bg_banner,
                logo,
                store_name,
                main_category: main_category.id,
            })
        } catch (error) {
            console.log(error);
        }
        setStore_name("");
        setBg_banner("");
        setLogo("");
    }
    useEffect(()=>{
        setSubmitDisabled(!store_name || !main_category);
    }, [store_name, main_category])
    
    useEffect(()=>{
        (async()=>{
            const data = await getMainCategories();
            if (data && data.length > 0) {
                setCategories(data);
                setMain_category(data[0]);
                setIsLoading(false);
            }
        })()
    }, [])
    
    if (isLoading) {
        return <Loading />
    }
    return (
        <form className='border p-2 my-4' onSubmit={submitHandler}>
            <h2 className='font-bold'>Add Store</h2>
            <InputText label="store_name" value={store_name} setValue={setStore_name}/>
            <InputText label="logo" value={logo} setValue={setLogo}/>
            <InputText label="bg_banner" value={bg_banner} setValue={setBg_banner}/>
            <InputOption 
                label={"main_category"} values={categories} field="name"
                value={main_category} setValue={setMain_category}
            />
            <SubmitBtn disabled={submitDisabled}/>
        </form>
    )
}
