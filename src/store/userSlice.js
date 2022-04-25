import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        userCred : null
    },
    reducers : {
        login : (state, action)=>{
            state.userCred = action.payload
        },
        logout : (state)=>{
            state.userCred = null
        }
    }
})

export const {login, logout} = userSlice.actions