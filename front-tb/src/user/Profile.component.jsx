import React, { useState, useEffect } from "react";
import Layout from "../core/Layout.component";
import { isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";
import { read, update, updateUser } from "./apiUser";

const Profile = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: false,
    success: false
  });
  // destructure
  const { token } = isAuthenticated();
  const { name, email, password, error, success } = values;

  const init = userId => {
    //console.log(userId)
    read(userId, token).then(data => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        // populate user info in the state
        setValues({ ...values, name: data.name, email: data.email }); // don't need password in state
      }
    });
  };
  useEffect(() => {
    init(match.params.userId); // need user id since it's used in the route.js
  }, []);

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    update(match.params.userId, token, { name, email, password }) // wrap name, email, pw in an object
      .then(data => {
        if (data.error) {
          console.log(data.error);
          alert(data.error);
        } else {
          // update data and state
          updateUser(data, () => {
            // update the state
            setValues({
              ...values,
              name: data.name,
              email: data.email,
              success: true
            });
          });
        }
      });
  };

  const redirectUser = success => {
    if (success) {
      return <Redirect to="/cart" />;
    }
  };

  const profileUpdate = (name, email, password) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          className="form-control"
          type="text"
          onChange={handleChange("name")}
          value={name}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          className="form-control"
          type="email"
          onChange={handleChange("email")}
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          className="form-control"
          type="password"
          onChange={handleChange("password")}
          value={password}
        />
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  );

  return (
    <Layout
      title="Profile"
      description="Update your profile"
      className="container-fluid"
    >
      <h2 className="mb-4">Update Profile</h2>

      {profileUpdate(name, email, password)}
      {redirectUser(success)}
    </Layout>
  );
};

export default Profile;
