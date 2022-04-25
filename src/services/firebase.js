import {
    getFirestore, doc, setDoc , getDoc , addDoc,
    collectionGroup, query, getDocs, collection, limit, updateDoc, orderBy, 
    arrayUnion, arrayRemove, increment, onSnapshot, where, startAfter,
    runTransaction,
    Timestamp
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export const getDocumentData = async(...path)=>{
    const db = getFirestore();
    const docRef = doc(db, ...path);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    }else{
        return null;
    }
}

export const createUser = async ({phone , email, password, name})=>{
    const db = getFirestore();
    const docRef = doc(db, "phones", phone);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
       throw new Error("Phone Number already exists");
    } 
    const auth = getAuth();
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    const {uid} = userCred.user;
    await setDoc(doc(db, "users", uid), {
        phone,
        name
    });
    await setDoc(doc(db, "phones", phone), {});
    await setDoc(doc(db, "users_public", uid), {name});
}


export const getUserData = async ()=>{
    const {uid} = getAuth().currentUser;
    return await getDocumentData("users", uid);
}

export const getTest = async ()=>{
    const db = getFirestore();
    const docRef = doc(db, "test", "gQW3CZ9isdK94IQ2yIQm");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("hi");
        const docRef2 = doc(db, docSnap.data().category.path);
        const docSnap2 = await getDoc(docRef2);
        if (docSnap2.exists()){
            console.log(docSnap2.data());
        }else {
            console.log("No such document 2!");
        }
    } else {
        console.log("No such document!");
    }
}


export const getProducts = async(...modifiers)=>{
    const db =  getFirestore();
    const products = query(collectionGroup(db, 'products'), ...modifiers); 
    
    const querySnapshot = await getDocs(products);
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({id: doc.id,...doc.data()});
    });
    return data;
}

export const checkIfLazGlobal= async(id)=>{
    return await getDocumentData("lazglobal", id);
}

export const checkIfLazmall = async(id)=>{
    return await getDocumentData("lazmall", id);
}

export const getCollectionData = async ( path ,...modifiers)=>{
    const db = getFirestore();
    const q = query(collection(db, path),...modifiers) ;
    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({id : doc.id, ...doc.data()})
    });
    return data;
}

export const getReviews = async ({storeID, prodID})=>{
    return await getCollectionData(`stores/${storeID}/products/${prodID}/reviews`, limit(3));
}

export const getVouchers = async (storeID)=>{
    const data = await getDocumentData(`stores/${storeID}`);
    return data && data.vouchers;
}


export const getCategoryData = async(path)=>{
    return await getDocumentData(path);
}

export const getProductData = async({storeID, prodID})=>{
    return await getDocumentData("stores", storeID, "products", prodID);
}

export const getStoreData = async(id)=>{
    return await getDocumentData("stores", id);
}

export const getSingleReview = async({storeID, prodID, reviewID})=>{
    return await getDocumentData("stores", storeID, "products", prodID, "reviews", reviewID);
}

export const getUserDataById = async (uid)=>{
    return await getDocumentData("users_public", uid);
}

export const updateFollowStore = async(storeID)=>{
    const db = getFirestore();
    const userId = getAuth().currentUser.uid;
    const currentUserRef = doc(db, "users", userId);
    const userData = await getDoc(currentUserRef);
    const storeRef = doc(db, 'stores', storeID);
    if (userData.data().following && userData.data().following.includes(storeID)) {
        await updateDoc(currentUserRef, {
            following: arrayRemove(storeID)
        });
        await updateDoc(storeRef, {
            followers : increment(-1)
        }) 
    }else{
        await updateDoc(currentUserRef, {
            following:  arrayUnion(storeID)
        });
        await updateDoc(storeRef, {
            followers : increment(1)
        })
    }
}

export const addToCollection = async(path, obj)=>{
    const db = getFirestore();
    await addDoc(collection(db, path), obj);
}


export const addToCart = async({storeID, prodID, inc=true})=>{
    const db = getFirestore();
    await runTransaction(db, async (transaction) => {
        const user = getAuth().currentUser;
        if (!user) {
            throw new Error("You must logged in first");
        }
        const prodRef = doc(db, `stores/${storeID}/products/${prodID}`)
        const prodData = await transaction.get(prodRef);
        if (!prodData.exists()) {
            throw new Error("Product document does not exist!");
        }
        if (prodData.data().stock <= 0) {
            throw new Error("No stocks available for the product");
        }
        const cartItemPath = `users/${user.uid}/cart/${prodID}`;
        const cartItemRef = doc(db, cartItemPath);
        const cartItemData = await transaction.get(cartItemRef);
        if (inc) {
            if (cartItemData.exists() && cartItemData.data().quantity >= prodData.data().stock) {
                throw new Error("Insufficient stocks for this product.");
            }
            await transaction.set(cartItemRef, 
                {
                    prodID,
                    storeID,
                    quantity: increment(1)
                },
                { merge: true }
            );
        }else{
            if (!cartItemData.exists()) {
                throw new Error("Cart item does not exist!");
            }
            if (cartItemData.data().quantity <= 1) {
                throw new Error("Cannot do operation.");
            }
            await transaction.set(cartItemRef, 
                {
                    prodID,
                    storeID,
                    quantity: increment(-1)
                },
                { merge: true }
            );
        }

       
    });
}


export const listenToCollection = (path, setValue, setErrorMsg=(err)=>{}, ...modifiers)=>{
    const db = getFirestore();
    const q = query(collection(db, path), ...modifiers);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        try {
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push({id:doc.id, ...doc.data()});
            });
            setValue(data);
        } catch (error) {
            setErrorMsg(error.message)
        }
    });
    return unsubscribe; 
}

export const getBrandName = async(id)=>{
    return await getDocumentData("brands", id);
}


export const listenOnDocument = (path, setValue, setErrorMsg=()=>{})=>{
    const db = getFirestore();
    const unsub = onSnapshot(doc(db, path), (doc) => {
        try {
            if (!doc.exists()) {
                throw new Error("Item does not exist!")
            }
            setValue({id: doc.id, ...doc.data()})
        } catch (error) {
            setErrorMsg(error.message)
        }
    });
    return unsub;
}



export const selectStore = async({storeID, selected})=>{
    const user = getAuth().currentUser;
    if (!user) {
        throw new Error("You must login first");
    }
    const db = getFirestore(); 
    await runTransaction(db, async (transaction) => {
        const cartPath = `users/${user.uid}/cart`;
        const q = query(collection(db, cartPath), where("storeID", "==", storeID));
        const querySnapshot = await getDocs(q);
        const refs = [];
        querySnapshot.forEach((doc) => {
            refs.push(doc.ref)
        });

        await Promise.all(refs.map(async(ref)=>{
            await transaction.update(ref, {selected})
        }))
    })
}


export const selectCartItem = async({ prodID, selected})=>{
    const db = getFirestore();
    const user = getAuth().currentUser;
    if (!user) {
        throw new Error("You must login first");
    }
    const ref = doc(db, `users/${user.uid}/cart/${prodID}`)
    await updateDoc(ref, {
        selected
    });
};


export const setCartItemPrice = async({storeID, prodID, price})=>{
    const user = getAuth().currentUser;
    if (!user) {
        throw new Error("You must login first");
    }
    const db = getFirestore();
    const path = `users/${user.uid}/cart/${prodID}`;
    const cartItemRef = doc(db, path);
    await updateDoc(cartItemRef, {
       price
    });
}

export const deleteSelectedCartItems = async()=>{
    const user = getAuth().currentUser;
    if (!user) {
        throw new Error("You must login first");
    }
    const db = getFirestore();

    await runTransaction(db, async (transaction) => {
        const path = `users/${user.uid}/cart`;
        const q = query(collection(db, path));
        const querySnapshot = await getDocs(q);
        const refs = [];
        querySnapshot.forEach((doc) => {
            if (doc.exists() && doc.data().selected === true) {
                refs.push(doc.ref)
            }
        });
        await Promise.all(refs.map(async(ref)=>{
            await transaction.delete(ref);
        }))
    })


}
export const selectAllCartItems = async({selected})=>{
    const user = getAuth().currentUser;
    if (!user) {
        throw new Error("You must login first");
    }
    const db = getFirestore();
    await runTransaction(db, async (transaction) => {
        const path = `users/${user.uid}/cart`;
        const q = query(collection(db, path));
        const querySnapshot = await getDocs(q);
        const refs = [];
        querySnapshot.forEach((doc) => {
            refs.push(doc.ref)
        });
        await Promise.all(refs.map(async(ref)=>{
            await transaction.update(ref, {selected});
        }))
    })

}

export const getProductTabs = async({filter, lastItemId})=>{
    const db = getFirestore();
    const modifiers = [];
    switch(filter) {
        case "price":
            modifiers.push(orderBy("price"));
            break;
        case "free-shipping":
            const q = query(collection(db, "stores"), orderBy("vouchers"));
            const querySnapshot = await getDocs(q);
            const storeIDs = [];
            querySnapshot.forEach((doc) => {
                storeIDs.push(doc.id)
            });
            modifiers.push(where('storeID', 'in', storeIDs));
            break;
        case "lazmall":
            const lazmalls = await getCollectionData( "lazmall");
            const lazmallIDs = lazmalls.map(items=>items.id);
            modifiers.push(where('storeID', 'in', lazmallIDs))
            break;
        case "lazglobal":
            const lazglobals = await getCollectionData("lazglobal");
            const lazglobalIDs = lazglobals.map(items=>items.id);
            modifiers.push(where('storeID', 'in', lazglobalIDs))
            break;
        default:
    }
    if (lastItemId) {
        const [storeID, prodID] = lastItemId.split("_");
        const lastDoc = await getDoc(doc(db, `stores/${storeID}/products/${prodID}`));
        modifiers.push(startAfter(lastDoc))
    }

    modifiers.push(limit(10));
    return await getProducts(...modifiers);
   
}

export const listenToSearchHistory = (user, setValue, setErrorMsg)=>{
    if (user) {
        const path = `users/${user.uid}/search_history`
        const unsub = listenToCollection(
            path, setValue, setErrorMsg, 
            orderBy("createdAt", "desc"),limit(5)
        )
        return unsub;
    }
    return null;
}

export const deleteCollection = async(path)=>{
    const db = getFirestore();
    await runTransaction(db, async (transaction) => {
        const q = query(collection(db, path));
        const querySnapshot = await getDocs(q);
        const refs = [];
        querySnapshot.forEach((doc) => {
            refs.push(doc.ref)
        });
        await Promise.all(refs.map(async(ref)=>{
            await transaction.delete(ref);
        }))
    }) 
}

export const clearSearchHistory = async()=>{
    const user = getAuth().currentUser;
    if (!user) {
        return;
    }
    await deleteCollection(`users/${user.uid}/search_history`);
}

export const addSearchHistory = async(content)=>{
    const user = getAuth().currentUser;
    if (!user) {
        return;
    }
    await addToCollection(`users/${user.uid}/search_history`, {
        content,
        createdAt: Timestamp.now()
    });
}

export const setDocumentData = async (path, obj, modifiers)=>{
    const db = getFirestore();
    const docRef =  doc(db, path);
    await setDoc(docRef, obj, modifiers);
}