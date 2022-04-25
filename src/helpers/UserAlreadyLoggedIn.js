import React from 'react'
import {ROUTES} from "../constants/routes";
import {Navigate, Outlet} from "react-router-dom";
export const UserAlreadyLoggedIn = ({
    user,
    children
}) => {
    if (user) {
        return <Navigate to={ROUTES.DASHBOARD}/>
    }
   return  children ? children : <Outlet />
} 
