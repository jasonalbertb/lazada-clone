import "react-loading-skeleton/dist/skeleton.css";
import React from 'react'
import {ReactLoader} from "./components/loading/ReactLoader";
import {LazadaLoading} from "./components/loading/LazadaLoading";
import {ErrorMsgModal} from "./components/ErrorMsgModal";
import {Suspense} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
//helpers
import {ProtectedRoute} from "./helpers/ProtectedRoute";
import {UserAlreadyLoggedIn} from "./helpers/UserAlreadyLoggedIn";
//hooks
import {useInitFirebase} from "./hooks/useInitFirebase";
import {useAuthChange} from "./hooks/useAuthChange";
//constants
import {ROUTES} from "./constants/routes";
//redux
import {useSelector} from "react-redux";

//pages
const Notfound = React.lazy(()=>import("./pages/Notfound"));
const Error = React.lazy(()=>import("./pages/Error"));
const Dashboard = React.lazy(()=> import("./pages/Dashboard"));
const LoginSignUp = React.lazy(()=> import("./pages/LoginSignUp"));
const Cart = React.lazy(()=>import("./pages/Cart"));
const AccountTab = React.lazy(()=> import("./pages/AccountTab"));
const CategoryTab = React.lazy(()=>import("./pages/CategoryTab"));
const OrderManagement = React.lazy(()=>import("./pages/OrderManagement"));
const FlashSale = React.lazy(()=> import("./pages/FlashSale"));
const Products = React.lazy(()=>import("./pages/Products"));
const Store = React.lazy(()=>import("./pages/Store"));
//Seed
const SeedPage = React.lazy(()=>import("./seed/SeedPage"));

export const App = () => {
  const {userCred} = useSelector(state=> state.user);
  const {appIsLoading, modalLazadaLoading} = useSelector(state=> state.loading);
  const {errorMsg} = useSelector(state=> state.error);
  useInitFirebase();
  useAuthChange();

  if (appIsLoading) {
    return <ReactLoader />;
  }

  return (
    <>
      {modalLazadaLoading && <LazadaLoading />}
      {errorMsg && <ErrorMsgModal/>}
      <Suspense fallback={<ReactLoader />}>
        <BrowserRouter>
          <Routes>
            <Route path='/'>
              {/* public Routes */}
              <Route index element={<Dashboard />}/>
              <Route path={ROUTES.CATEGORY_TAB} element={<CategoryTab />}/>
              <Route path={ROUTES.ACC_TAB} element={ <AccountTab />}/>
              <Route path={ROUTES.FLASHSALE} element={<FlashSale />}/>
              <Route path={ROUTES.SINGLE_PRODUCT_ROUTE} element={<Products />}/>
              <Route path={ROUTES.STORE_ROUTE} element={<Store />} />
              
              <Route element={<UserAlreadyLoggedIn user={userCred} />} >
                <Route path={ROUTES.LOGIN} element={<LoginSignUp />}/>
              </Route>

              <Route element={<ProtectedRoute user={userCred}/>}>
                <Route path={ROUTES.CART} element={<Cart />}/>
                <Route path={ROUTES.ORDERS} element={<OrderManagement />} />
              </Route>  

              {/* Seed */}
              <Route path="seed" element={<SeedPage />}/>

              <Route path={ROUTES.ERR} element={<Error />}/>
              <Route path='*' element={<Notfound />}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </>
  )
}
