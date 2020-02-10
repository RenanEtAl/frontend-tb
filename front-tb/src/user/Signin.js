import React, { useState } from 'react'
import Layout from '../core/Layout'
import { Redirect } from 'react-router-dom'
import { signin, authenticate } from '../auth'


const Signin = () => {
    const [values, setValues] = useState({
        email: 'first@gmail.com',
        password: '1234567',
        error: '',
        loading: false,
        redirectToReferrer: false
    })

    const { email, password, error, loading, redirectToReferrer } = values

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

    const redirectUser = () => {
        if (redirectToReferrer) {
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

            <Layout title="Signin" description="Signin if you are already registered"
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