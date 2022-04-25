import {getCollectionData} from "../services/firebase";

export const getMainCategories = async()=>{
    const data = await getCollectionData("category_tree");
    return data;
}

export const getBrands = async()=>{
    const data = await getCollectionData("brands");
    return data;
}

export const changeHandler = (f)=>{
    return (e)=>{
        f(e.target.value);
    }
}

export const getAllStores = async()=>{
    const data = await getCollectionData("stores");
    if (data) {
        return data.map(item=> {
                const {id, store_name} = item;
                return {id, store_name};
            }
        )
    }else{
        return null
    }
}