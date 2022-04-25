import {createSlice} from "@reduxjs/toolkit";

export const ErrorSlice = createSlice({
    name: "error",
    initialState:{
        IsError: null,
        errorMsg: null
    },
    reducers : {
        setIsError : (state, action)=>{
            state.IsError = action.payload
        }, 
        setMsgError : (state, action)=>{
            state.errorMsg = action.payload
        }, 
    }
})

export const {setIsError, setMsgError} = ErrorSlice.actions;