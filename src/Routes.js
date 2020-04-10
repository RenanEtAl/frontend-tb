import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Signup from './user/Signup.component'
import Signin from './user/Signin.component'
import Home from './core/home/Home.component'
import Dashboard from './user/UserDashboard.component'
import PrivateRoute from './auth/routes/PrivateRoute'
import AdminDashboard from './user/AdminDashboard.component'
import AdminRoute from './auth/routes/AdminRoute'
import AddCategory from './admin/AddCategory.component'
import AddProduct from './admin/AddProduct.component'
import Shop from './core/shop/Shop.component'
import Product from './core/Product.component'
import Cart from './core/cart/Cart.component'
import Orders from './admin/Orders.component'
import Profile from './user/Profile.component'
import ManageProducts from './admin/ManageProducts.component'
import UpdateProduct from './admin/UpdateProduct.component'
import UpdateCategory from './admin/UpdateCategory.component'
import ManageCategories from './admin/ManageCategories.component'




const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/shop" exact component={Shop} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <PrivateRoute path='/user/dashboard' exact component={Dashboard}/>
                <AdminRoute path='/admin/dashboard' exact component={AdminDashboard}/>
                <AdminRoute path='/create/category' exact component={AddCategory}/>
                <AdminRoute path='/create/product' exact component={AddProduct}/>
                <AdminRoute path='/admin/products' exact component={ManageProducts}/>
                <AdminRoute path='/admin/categories' exact component={ManageCategories}/>
                <AdminRoute path='/admin/product/update/:productId' exact component={UpdateProduct}/>
                <AdminRoute path='/admin/category/update/:categoryId' exact component={UpdateCategory}/>
                <Route path="/product/:productId" exact component={Product} />
                <Route path="/cart" exact component={Cart} />
                <AdminRoute path='/admin/orders' exact component={Orders}/>
                <PrivateRoute path='/profile/:userId' exact component={Profile}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes