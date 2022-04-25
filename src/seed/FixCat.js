import React, {useState} from 'react'
import {getProducts, setDocumentData} from "../services/firebase";
export const FixCat = () => {
    const [disabled, setDisabled] = useState(false);
    const submitHandler = async(e)=>{
        setDisabled(true)
        try {
            e.preventDefault();
            const allProducts = await getProducts();
            const storeIDs = [...new Set(allProducts.map(product=>product.storeID))];
            const data = storeIDs.map(storeID=>{
                return {
                    storeID,
                    storeProducts: allProducts.filter(product=>product.storeID === storeID)
                }
            });
            await Promise.all(data.map(async(item)=>{
                const path = `stores/${item.storeID}/category`;
                await Promise.all(item.storeProducts.map(async({category})=>{
                    const catID = category.split("/");
                    await setDocumentData(`${path}/${catID.join('-')}`,{
                        name: category
                    })
                }))
            }))
        } catch (error) {
            console.log(error);
        }
        setDisabled(false);
        console.log("hi");
    }
    return (
        <form className='p-2 border'>
            <div className='font-bold'>FixCat</div>
            <button 
                disabled={disabled}
                className='px-2 py-1 rounded-sm bg-gray-400 disabled:bg-white'
                onClick={submitHandler}
            >Submit</button>
        </form>
    )
}
