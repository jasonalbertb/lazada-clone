import {configureStore} from "@reduxjs/toolkit";
import {userSlice} from "./userSlice";
import {firebaseSlice} from "./firebaseSlice";
import {LoadingSlice} from "./LoadingSlice";
import {ErrorSlice} from "./ErrorSlice";
export const store = configureStore({
    reducer : {
        user : userSlice.reducer,
        firebase: firebaseSlice.reducer,
        loading : LoadingSlice.reducer,
        error : ErrorSlice.reducer
    }
}) 