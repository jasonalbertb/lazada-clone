import React, {useState, useEffect} from 'react'
import {SubmitBtn} from "./SubmitBtn";
import {getCollectionData} from "../services/firebase";
import {Loading} from "./Loading";
import {InputOption} from "./InputOption";
import {getFirestore, doc, updateDoc} from "firebase/firestore";
export const AddVouchers = () => {
    const [submitBtnDisabled, setSubmitBtnDisabled] = useState(true);
    const [storeToAdd, setStoreToAdd] = useState();
    const [stores, setStores] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const handleSubmit = async (e)=>{
        try {
            setSubmitBtnDisabled(true);
            e.preventDefault();
            const vouchers = [
                {
                    discount : 25,
                    mininum_spend : 100,
                    type : "free shipping"
                },
                {
                    discount : 50,
                    mininum_spend : 200,
                    type : "free shipping"
                },
                {
                    discount : 75,
                    mininum_spend : 300,
                    type : "free shipping"
                },
                {
                    discount : 100,
                    mininum_spend : 2000,
                    type : "free shipping"
                },
            ]
            const db = getFirestore();
            await updateDoc(doc(db, `stores/${storeToAdd.id}`),{
                vouchers : vouchers[Math.floor(Math.random()*vouchers.length)]
            })

        } catch (error) {
            console.log(error);
        }
        setStoreToAdd("");
    }
    useEffect(()=>{
        setSubmitBtnDisabled(!storeToAdd);
    }, [storeToAdd])

    useEffect(()=>{
        (async()=>{
            try {
                const data = await getCollectionData( "stores");
                if (data) {
                    setStores(data);
                    setStoreToAdd(data[0])
                    setIsLoading(false);
                }
            } catch (error) {
                console.log(error);
            }
        })()
    }, [])

    if (isLoading) {
        return <Loading />
    }
    return (
        <form onSubmit={handleSubmit} className='border p-2'>
            <div className='bold'>Add Vouchers</div>
            <InputOption 
                label="storeToAdd"
                value={storeToAdd} setValue={setStoreToAdd}
                values={stores} field="store_name"
            />
            <SubmitBtn disabled={submitBtnDisabled}/>
        </form>
    )
}
