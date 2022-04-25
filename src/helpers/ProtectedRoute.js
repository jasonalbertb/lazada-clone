import React from 'react'
import {ROUTES} from "../constants/routes";
import {Navigate, Outlet} from "react-router-dom";
export const ProtectedRoute = ({
    user,
    redirectPath = ROUTES.LOGIN,
    children
}) => {
    if (!user) {
        return <Navigate to={redirectPath}/>
    }
   return  children ? children : <Outlet />
} 
