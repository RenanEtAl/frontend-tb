import React, { useState } from 'react'
import Layout from "../core/Layout.component";
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import { createCategory } from './api/apiAdmin'


const AddCategory = () => {
    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    // destructure user and toke from localStorage
    const { user, token } = isAuthenticated()

    const handleChange = (event) => {
        setError('')
        setName(event.target.value)
    }

    const clickSubmit = event => {
        event.preventDefault()
        setError('')
        setSuccess(false)
        // make request to api to create category
        createCategory(user._id, token, { name })
            .then(data => {
                if (data.error) {
                    setError(data.error)
                } else {
                    setError('')
                    setSuccess(true)
                }
            })

    }
    const newCategoryFrom = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Category Name</label>
                <input className="form-control" type="text" onChange={handleChange} value={name} autoFocus required />

            </div>
            <button className="btn btn-outline-primary">Create Category</button>
        </form>
    )
    const showSuccess = () => {
        if (success) {
            return <h3 className="text-success">Category {name} is successfully created.</h3>
        }
    }
    const showError = () => {
        if (error) {
            return <h3 className="text-danger">Category {name} is unsuccessfully created. Category name should be unique. {error} </h3>
        }
    }

    const goBack = () => (
        <div className="mt-5">
            <Link className="text-warning" to="/admin/dashboard"> Go back to admin dashboard</Link>
        </div>
    )
    return (
        <Layout title='Add a new category' description={`Hello ${user.name}!`} >
            <div className="row">

                <div className="col-md-8 offset-md-2">
                    {showSuccess()}
                    {showError()}
                    {newCategoryFrom()}
                    {goBack}


                </div>
            </div>



        </Layout>

    )

}

export default AddCategory