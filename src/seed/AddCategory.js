import React , {useState, useEffect}from 'react'
import {TreeViewAllSelectable} from "../components/TreeViewAllSelectable";
import {InputText} from "./InputText";
import {SubmitBtn} from "./SubmitBtn";
import {addToCollection} from "../services/firebase";
export const AddCategory = () => {
    const [category, setCategory] = useState("");
    const [path, setPath] = useState("");
    const [submitDisabled,setSubmitDisabled] = useState(true);
    const handleSubmit = async(e)=>{
        try {
            setSubmitDisabled(true);
            e.preventDefault();
            await addToCollection(path, {name: category})
            setCategory("");
            setPath("");
            setSubmitDisabled(false)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        setSubmitDisabled(!category || !path);
    }, [category, path])
    return (
        <form className='border p-2' onSubmit={handleSubmit}>
            <div className='font-bold'>Add Category</div>
            <TreeViewAllSelectable label="category" selected={path} setSelected={setPath}/>
            <InputText label="category" value={category} setValue={setCategory}/>
            <SubmitBtn disabled={submitDisabled}/>
        </form>
    )
}
