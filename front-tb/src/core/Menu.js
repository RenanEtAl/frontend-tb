import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

// menu color
// history is the actual browser path
// path is what is being passed ie home, signin, signup
const isActive = (history, path) => {
    // if the browser path name is the same as the path
    if (history.location.pathname === path) {
        return { color: '#ff9900' }
    } else {
        return { color: '#ffffff' }
    }
}
// props ie history come from react-router-dom
const Menu = ({ history }) => (
    <div>
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, '/')} to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">Signin</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, '/signup')} to="/signup">Signup</Link>
            </li>
        </ul>
    </div>
)

export default withRouter(Menu)