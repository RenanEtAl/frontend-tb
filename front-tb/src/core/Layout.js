import React, { Component } from 'react'
import Menu from './Menu'

// layout that will be used for every pages
const Layout = (
    { title = 'Title', 
    description = 'Description', 
    className, 
    children }) => (

    <div>
        <Menu />
        <div className="jumbotron">
            <h2>{title}</h2>
            <p className="lead">{description}</p>
        </div>
        <div className={className}> 
            {children}
        </div>

    </div>

)
export default Layout