import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isAuthenticated } from './index'


// take the props component and the rest

const AdminRoute = ({ component: Component, ...rest }) => (
    // grab the props
    // if user isAuthenticated and admin return the props otherwise redirect to signin page
    <Route
        {...rest}
        render={props =>
            isAuthenticated() && isAuthenticated().user.role === 1 ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to={{
                            pathname: "/signin",
                            state: { from: props.location }
                        }}
                    />
                )
        }
    />
);

export default AdminRoute;
