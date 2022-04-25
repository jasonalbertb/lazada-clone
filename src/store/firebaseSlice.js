import {createSlice} from "@reduxjs/toolkit";

export const firebaseSlice = createSlice({
    name: "firebase",
    initialState : {
        isFirebaseInitialized : false
    },
    reducers : {
        setIsFirebaseInitialized : (state, action)=>{
            state.isFirebaseInitialized = action.payload
        }
    }
})

export const {setIsFirebaseInitialized} = firebaseSlice.actions