import React, {useState, useEffect} from 'react'
import {InputOption} from "./InputOption";
import {SubmitBtn} from "./SubmitBtn";
import {
    onSnapshot,getFirestore, collection,
    query, doc, setDoc, deleteDoc, where,
    documentId
} from "firebase/firestore";
import { getStoreData} from "../services/firebase";

export const AddLazMall = () => {
    const [toBeAdded, setToBeAdded] = useState("");
    const [stores, setStores] = useState([]);

    const [lazmall, setLazmall] = useState("");
    const [lazmallStores, setLazmallStores] = useState([]);

    const [submitDisabledAdd, setSubmitDisabledAdd] = useState(false);
    const [submitDisabledRemove, setSubmitDisabledRemove] = useState(false);
    
    useEffect(()=>{
        setSubmitDisabledAdd(!toBeAdded)
    }, [toBeAdded])
    useEffect(()=>{
        setSubmitDisabledRemove(!lazmall)
    }, [lazmall])
    useEffect(()=>{
        let unsubscribe;
        const db = getFirestore();

        let q;
        if (lazmallStores.length === 0) {
            q = query(collection(db, "stores"))
        }else{
            q = query(
                collection(db, "stores"),
                where(documentId(), 'not-in', lazmallStores.map(({id})=>id))
            )
        }
        unsubscribe = onSnapshot(q, (querySnapshot) => {
            (async()=>{
                const ids = [];
                querySnapshot.forEach(doc=>{
                    ids.push({id: doc.id});
                });
                const data =  await Promise.all(
                    ids.map(async ({id})=>{
                        const data = await getStoreData(id);
                        return {id, ...data}
                    })
                )
                setStores(data);
                setToBeAdded(data[0])
            })()
        });
        return ()=>{
            unsubscribe();
        }
    }, [lazmallStores]);
    useEffect(()=>{
        let unsubscribe;
        const db = getFirestore();
        const q = query(collection(db, "lazmall"));
        unsubscribe = onSnapshot(q, (querySnapshot) => {
            (async()=>{
                const ids = [];
                querySnapshot.forEach(doc=>{
                    ids.push({id: doc.id});
                });
                const data =  await Promise.all(
                    ids.map(async ({id})=>{
                        const data = await getStoreData(id);
                        return {id, ...data}
                    })
                )
                setLazmallStores(data);
                setLazmall(data[0])
            })()
        });
        return ()=>{
            unsubscribe();
        }
    }, [])

    const submitHandlerAdd = async(e)=>{
        e.preventDefault();
        setSubmitDisabledAdd(true);
        const db = getFirestore();
        const docRef = doc(db, "lazmall", toBeAdded.id);
        await setDoc(docRef, {});
        setSubmitDisabledAdd(false);
    }
    const submitHandlerRemove = async(e)=>{
        e.preventDefault();
        setSubmitDisabledRemove(true);
        const db = getFirestore();
        const docRef = doc(db, "lazmall", lazmall.id);
        await deleteDoc(docRef);
        setSubmitDisabledRemove(false);
    }

    return (
        <>
            <form onSubmit={submitHandlerAdd} className='p-2 border'>
                <div className='font-bold'>Add Lazmall</div>
                <InputOption 
                    label="toBeAdded" 
                    value={toBeAdded} setValue={setToBeAdded}
                    values={stores} field="store_name"
                />
                <SubmitBtn disabled={submitDisabledAdd}/>
            </form>
            <form onSubmit={submitHandlerRemove} className='p-2 border'>
                <div className='font-bold'>Remove Lazmall</div>
                <InputOption 
                    label="lazmall" 
                    value={lazmall} setValue={setLazmall}
                    values={lazmallStores} field="store_name"
                />
                <SubmitBtn disabled={submitDisabledRemove}/>
            </form>
        </>
    )
}
