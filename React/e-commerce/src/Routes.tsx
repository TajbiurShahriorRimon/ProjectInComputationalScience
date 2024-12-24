import React from 'react';
import {Routes,Route} from "react-router-dom";
import UserPassword from './components/Forms/UserPassword';
import UserRegistration from './components/Forms/UserRegistration';
import VendorRegistrationShop from './components/Forms/VendorRegistrationShop';
import VendorRegistrationUser from './components/Forms/VendorRegistrationUser';
import AddProducts from './components/Forms/AddProducts';
import AddCategory from './components/Forms/AddCategory';
import Login from './components/Pages/Login';
import Vendor from './components/Pages/Vendor';
import VendorProfile from './components/Body/VendorProfile';
import VendorShopInfo from './components/Body/VendorShopInfo';
import VendorAddProducts from './components/Body/VendorAddProducts';
import VendorEditProducts from './components/Body/VendorAddProducts';
import AdminAddCategories from './components/Body/AdminAddCategories';
import Customer from "./components/Pages/Customer";
import ProductDetails from "./components/Pages/ProductDetails";
import CustomerProfile from "./components/Pages/CustomerProfile";
import CustomerProductForReview from "./components/Pages/CustomerProductForReview";
import ProductCustomerGiveReview from "./components/Pages/ProductCustomerGiveReview";
import TestMail from './components/Pages/testMail';
import ProductReviews from "./components/Pages/ProductReviews";
import Logout from "./components/Pages/Logout";
import ShoppingCart from "./components/Pages/ShoppingCart";
import Home from './components/Pages/Home';
import Admin from './components/Pages/Admin';
import AdminManageUsers from './components/Pages/AdminManageUsers';
import AdminManageCategory from './components/Pages/AdminManageCategory';
import VendorReg from './components/Pages/VendorReg';
import CustomerReg from './components/Pages/CustomerReg';
import OrderPending from "./components/Pages/OrderPending";
import OrderPendingDetails from "./components/Pages/OrderPendingDetails";
import ProductSearch from "./components/Pages/ProductSearch";
import CustomerOrders from "./components/Pages/CustomerOrders";
import CustomerOrderDetails from "./components/Pages/CustomerOrderDetails";
import VendorProducts from "./components/Pages/VendorProducts";
import UserEditProfile from "./components/Pages/UserEditProfile";
import UserChangePass from "./components/Pages/UserChangePass";

import CategoryProductsCount from "./components/Pages/CategoryProductsCount";
import YearlySales from "./components/Pages/YearlySales";
import MonthlySales from "./components/Pages/MonthlySales";

import VerifyMail from './components/Pages/VerifyMail';
import ProductYearlySales from "./components/Pages/ProductYearlySales";
import ProductMonthlySales from "./components/Pages/ProductMonthlySales";
import VendorEditShop from "./components/Pages/VendorEditShop";
import EditProduct from './components/Forms/EditProducts2';
import ProductEdit from "./components/Pages/ProductEdit";
import DailySales from "./components/Pages/DailySales";
import ProductDailySales from "./components/Pages/ProductDailySales";

import Payment from './components/Pages/Payment';
import Completion from './components/Body/sitePaymentCompletion';

function MainRoutes(){
    return(
        <div>
            <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/uReg" element={<UserRegistration/>}/>
                    <Route path="/uVendorReg" element={<VendorRegistrationUser/>}/>
                    <Route path="/sVendorReg" element={<VendorRegistrationShop/>}/>
                    <Route path="/sVendorReg/:mail" element={<VendorRegistrationShop/>}/>
                    <Route path="/sLoginReg/:mail" element={<UserPassword/>}/>
                    <Route path="/vProfile" element={<VendorProfile/>}/>
                    <Route path="/vShopInfo" element={<VendorShopInfo/>}/>
                    <Route path="/vHome" element={<Vendor/>}/>
                    <Route path="/admin" element={<Admin/>}/>
                    <Route path="/aManageUsers" element={<AdminManageUsers/>}/>
                    <Route path="/aManagecategory" element={<AdminManageCategory/>}/>
                    <Route path="/addProducts" element={<AddProducts/>}/>
                    <Route path="/addCategory" element={<AddCategory/>}/>
                    <Route path="/vAddProducts/:mail" element={<VendorAddProducts/>}/>
                    <Route path="/vEditProducts/:mail/:id" element={<ProductEdit/>}/>
                    <Route path="/aAddCategory" element={<AdminAddCategories/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/customerReg" element={<CustomerReg/>}/>
                    <Route path="/vendorReg" element={<VendorReg/>}/>
                    <Route path="/verifyMail/:mail/:code" element={<VerifyMail/>}/>
                    <Route path="/testMail/:mail" element={<TestMail/>}/>


                    {/*Customer*/}
                    <Route path="/customer/index" element={<Customer/>}/>
                    <Route path="/customer/profile" element={<CustomerProfile/>}/>
                    <Route path="/customer/productForReview" element={<CustomerProductForReview/>}/>

                    {/*Product*/}
                    <Route path="/product/customer/giveReview/:productId" element={<ProductCustomerGiveReview/>}/>
                    <Route path="/product/productDetails/:id" element={<ProductDetails/>}/>
                    <Route path="/product/allReviews/:id" element={<ProductReviews/>}/>
                    <Route path="/product/search/:key" element={<ProductSearch/>}/>
                    <Route path="/shoppingCart" element={<ShoppingCart/>}/>
                    <Route path="/vendor/products" element={<VendorProducts/>}/>
                    <Route path="/product/allReviews/:id" element={<ProductReviews/>}/>
                    <Route path="/product/yearlySales/:key" element={<ProductYearlySales/>}/>
                    <Route path="/product/monthlySales/:productId/:year" element={<ProductMonthlySales/>}/>
                    <Route path="/product/dailySales/:year/:month/:productId" element={<ProductDailySales/>}/>

                    {/*Order*/}
                    <Route path="/order/pending" element={<OrderPending/>}/>
                    <Route path="/order/pendingSalesDetails/:orderId" element={<OrderPendingDetails/>}/>
                    <Route path="/order/customer" element={<CustomerOrders/>}/>
                    <Route path="/order/salesDetails/:orderId" element={<CustomerOrderDetails/>}/>
                    <Route path="/order/yearlySales" element={<YearlySales/>}/>
                    <Route path="/order/monthlySales/:year" element={<MonthlySales/>}/>
                    <Route path="/order/dailySales/:year/:month" element={<DailySales/>}/>

                    {/*User*/}
                    <Route path="/user/profileEdit" element={<UserEditProfile/>}/>
                    <Route path="/user/changePassword" element={<UserChangePass/>}/>
                    <Route path="/vendor/updateShop" element={<VendorEditShop/>}/>

                    {/*Category*/}
                    <Route path="/category/countProducts" element={<CategoryProductsCount/>}/>

                    {/*Logout*/}
                    <Route path="/logout" element={<Logout/>}/>

                    {/* Payment */}
                    <Route path="/checkout" element={<Payment/>} />
                    <Route path="/payment/completion" element={<Completion/>} />

            </Routes>
        </div>
    )
}

export default MainRoutes;