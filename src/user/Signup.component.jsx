import React, { useState } from 'react'
import Layout from '../core/Layout.component'
import { Link } from 'react-router-dom'
import { signup } from '../auth'


const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    })

    const { name, email, password, error, success } = values

    // higher order function returning another function
    const handleChange = (name) => (event) => {
        // name is dynamic; could be name, email, or password
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({ ...values, error: false })
        signup({ name, email, password }) // sending javascript object
            .then(data => {
                if (data.error) {
                    // get the error
                    setValues({ ...values, error: data.error, success: false })
                } else {
                    // grab the rest of the values
                    // clear the values, set success to true
                    setValues({ ...values, name: '', email: '', error: '', success: true })
                }
            })
    }


    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted"> Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control"
                    value={name}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control"
                    value={email}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control"
                    value={password}
                />
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">
                Submit
            </button>
        </form>
    )
    const showSuccess = () => (
        // if it's successful display, otherwise none
        <div className="alert alert-info mt-5" style={{ display: success ? '' : 'none' }}>
            <Link to="/signin">New account is create. Please signin.</Link>
        </div>
    )
    const showError = () => (
        // if there's an error display, otherwise none
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    )
    return (
        (

            <Layout title="Sign Up" description="Create Account"
                className="container col-md-8 offset-md-2">

                {showError()}
                {signUpForm()}
                {showSuccess()}

            </Layout>


        )
    )
}

export default Signup