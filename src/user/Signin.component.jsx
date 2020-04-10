import React, { useState } from 'react'
import Layout from '../core/Layout.component'
import { Redirect } from 'react-router-dom'
import { signin, authenticate, isAuthenticated } from '../auth'


const Signin = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false
    })

    const { email, password, error, loading, redirectToReferrer } = values
    const { user } = isAuthenticated() //desconstruct so we can easily redirect the user based on the role

    // higher order function returning another function
    const handleChange = (name) => (event) => {
        // name is dynamic; could be name, email, or password
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({ ...values, error: false, loading: true })
        signin({ email, password }) // sending javascript object
            .then(data => {
                if (data.error) {
                    // get the error
                    setValues({ ...values, error: data.error, laoding: false })
                } else {
                    authenticate(data,
                        () => {
                            // grab the rest of the values
                            // clear the values, set success to true
                            setValues({ ...values, redirectToReferrer: true }) // redirect to dashboard/homepage
                        })
                }
            })
    }


    const signInForm = () => (
        <form>

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
    const showLoading = () => (
        // if it's successful display loading, otherwise none
        loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
        )
    )
    // redirect user based on the role
    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />
            } else {
                return <Redirect to="/user/dashboard" />
            }
        }
        
        if(isAuthenticated()) {
            return <Redirect to="/" />
        }
    }
    const showError = () => (
        // if there's an error display, otherwise none
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    )
    return (
        (

            <Layout title="Sign In" description="You already have an account? Sign In!"
                className="container col-md-8 offset-md-2">

                {showError()}
                {signInForm()}
                {showLoading()}
                {redirectUser()}

            </Layout>


        )
    )
}

export default Signin