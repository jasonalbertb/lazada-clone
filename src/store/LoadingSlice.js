import {createSlice} from "@reduxjs/toolkit";


export const LoadingSlice = createSlice({
    name : "loading",
    initialState : {
        appIsLoading : true,
        modalLazadaLoading: false
    },
    reducers : {
        setAppIsLoading : (state, actions)=>{
            state.appIsLoading = actions.payload
        },
        setModalLazadaLoading : (state, actions)=>{
            state.modalLazadaLoading = actions.payload
        },
    }
});

export const {setAppIsLoading, setModalLazadaLoading} = LoadingSlice.actions