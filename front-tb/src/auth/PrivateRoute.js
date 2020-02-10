import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isAuthenticated } from './index'


// take the props component and the rest

const PrivateRoute = ({ component: Component, ...rest }) => (
    // grab the props
    // if user isAuthenticated return the props otherwise redirect to signin page
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
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

export default PrivateRoute;
