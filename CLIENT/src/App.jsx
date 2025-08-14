import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/ui/auth/layout";
import AuthRegister from "./pages/auth/register";
import AuthLogin from "./pages/auth/login";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import Adminorders from "./pages/admin-view/orders";
import Adminfeatures from "./pages/admin-view/features";
import Adminproducts from "./pages/admin-view/products";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingAccount from "./pages/shopping-view/account";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingListing from "./pages/shopping-view/listing";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton"
import PaypalReturnPage from "./pages/shopping-view/paypal-return";
import PaymentSuccessPage from "./pages/shopping-view/payment-success";


function App() {

  
  const{isAuthenticated,user,isLoading}=useSelector(state=>state.auth)
  const dispatch=useDispatch();

  useEffect(()=>{
dispatch(checkAuth())
  },[dispatch])
  if(isLoading)return <Skeleton className="h-[20px] w-[100px] rounded-full" />
  return (
    <div className="flex flex-col overflow-hidden bg-white  ">
      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth  isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}><AdminLayout /></CheckAuth>
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<Adminorders />} />
          <Route path="features" element={<Adminfeatures />} />
          <Route path="products" element={<Adminproducts />} />
        </Route>
        <Route path="/shop" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}><ShoppingLayout /></CheckAuth>
        }>
          <Route path="home" element={<ShoppingHome />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="paypal-return" element={<PaypalReturnPage />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/unauth-page" element={<UnauthPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
