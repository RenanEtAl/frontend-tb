import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../../auth";
import { itemTotal } from "../cartHelpers";

// menu color
// history is the actual browser path
// path is what is being passed ie home, signin, signup
const isActive = (history, path) => {
  // if the browser path name is the same as the path
  if (history.location.pathname === path) {
    return {
      color: "#ff9900",
      borderBottomColor: "#ff9900",
      borderBottom: "solid"
    };
  } else {
    return { color: "#ffffff" };
  }
};
// props ie history come from react-router-dom
const Menu = ({ history }) => (
  <div>
    <ul className="nav nav-tabs bg-primary justify-content-center">
      <li className="nav-item">
        <Link
          className="menu-item nav-link"
          style={isActive(history, "/")}
          to="/"
        >
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link"
          style={isActive(history, "/shop")}
          to="/shop"
        >
          Shop
        </Link>
      </li>

      <li className="nav-item">
        <Link
          className="nav-link"
          style={isActive(history, "/cart")}
          to="/cart"
        >
          <i className="fas fa-shopping-cart"></i>
          <sup>
            <small className="cart-badge">{itemTotal()}</small>
          </sup>
        </Link>
      </li>

      {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(history, "/user/dashboard")}
            to="/user/dashboard"
          >
            Dashboard
          </Link>
        </li>
      )}

      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(history, "/admin/dashboard")}
            to="/admin/dashboard"
          >
            Dashboard
          </Link>
        </li>
      )}

      {!isAuthenticated() && (
        <Fragment>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/signin")}
              to="/signin"
            >
              Sign In
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/signup")}
              to="/signup"
            >
              Sign Up
            </Link>
          </li>
        </Fragment>
      )}

      {isAuthenticated() && (
        <div>
          <li className="nav-item">
            <span
              className="nav-link"
              style={{ cursor: "pointer", color: "#ffffff" }}
              onClick={() =>
                signout(() => {
                  history.push("/");
                })
              }
            >
              Signout
            </span>
          </li>
        </div>
      )}
    </ul>
  </div>
);

export default withRouter(Menu);
