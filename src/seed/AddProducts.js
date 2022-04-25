import React, {useState, useEffect} from 'react'
import {getBrands, getAllStores} from "./utils";
import {Loading} from "./Loading";
import {DynamicInput} from "./DynamicInput";
import {InputText} from "./InputText";
import {InputOption} from "./InputOption";
import {SubmitBtn} from "./SubmitBtn";
import {TreeView} from "../components/TreeView";
import {addToCollection, setDocumentData} from "../services/firebase";
export const AddProducts = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [allBrands, setAllBrands] = useState([]);
    const [isBtnDisabled, setIsBtnDisabled] = useState(true);
    const [stores, setStores] = useState([]);
    const [brand, setBrand] = useState("");
    const [gallery, setGallery] = useState([]);
    const [installment, setInstallment] = useState(0);
    const [item_name, setItem_name] = useState("");
    const [price, setpPrice] = useState(0);
    const [storeID, setStoreID] = useState(null);
    const [stock, setStock] = useState(0);
    const [prod_details, setProd_details] = useState([]);
    const [category, setCategory] = useState("");
    const submitHandler = async(e)=>{
       try {
            e.preventDefault();
            await addToCollection(`stores/${storeID.id}/products`,{
                item_name,
                price: Number(price),
                brand: brand.id, 
                gallery,
                installment: {months: Number(installment)},
                storeID: storeID.id,  
                stock: Number(stock), 
                prod_details,
                category,
                rating: 0,
                reviewCount: 0, 
                sold: 0,
            });
            const catID = category.split("/");
            const path = `stores/${storeID.id}/category/${catID.join('-')}`;
            await setDocumentData(path, {
                name : category
            })
       } catch (error) {
           console.log(error);
       }
       setItem_name("");
       setInstallment(0);
       setGallery([]);
       setpPrice(0);
       setStock(0);
       setProd_details([]);
       setCategory("")
    }
    useEffect(()=>{
        (async()=>{
            try {
                const data = await getBrands();
                setBrand(data[0]);
                setAllBrands(data);
                const sData = await getAllStores();
                setStoreID(sData[0]);
                setStores(sData);
                setIsLoading(false)
            } catch (error) {
                console.log(error);
            }
        })()
    }, [])

    useEffect(()=>{
        setIsBtnDisabled(!(item_name && price && installment && brand && storeID && stock && category && gallery.length > 0));
    }, [item_name, price, installment, brand, stock, storeID, category, gallery]);

    if (isLoading) {
        return <Loading />
    }

    return (
        <form
            onSubmit={submitHandler} 
            className='border p-2 my-2'>
            <h2 className='font-bold'>Add Product</h2>
            <InputText 
                label={"item_name"} 
                value={item_name} setValue={setItem_name}
            />
            <InputText 
                type='number' label={"price"}
                value={price} setValue={setpPrice}
            />
            <InputOption 
                values={allBrands} field={"brand_title"}
                label={"brand"} value={brand} setValue={setBrand} 
            />
            <InputText 
                type='number' label={"installment"}
                value={installment} setValue={setInstallment}
            />
            <DynamicInput label={"gallery"} value={gallery} setValue={setGallery}/>
            <InputOption 
                values={stores} field={"store_name"}
                label={"storeID"} value={storeID} setValue={setStoreID } 
            />
            <InputText 
                type='number' label={"stock"}
                value={stock} setValue={setStock}
            />
            <DynamicInput label={"prod_details"} value={prod_details} setValue={setProd_details}/>
            <TreeView label="category" selected={category} setSelected={setCategory}/>
            <SubmitBtn disabled={isBtnDisabled}/>         
        </form>
    )
}
