import React, { useState, useEffect } from "react";
import Layout from "../core/Layout.component";
import { isAuthenticated } from "../auth";
import { getCategories } from "./api/apiAdmin";


const ManageCategories = () => {
    const [categories, setCategories] = useState([])

    const {user, token} = isAuthenticated()
    
    const loadCategories =()=>{
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                console.log(data)
                //setCategories(data);
            }
        });
    }

    useEffect(() => {
      loadCategories()
    }, [])


    return (


        <Layout
            title={`Hi $`}
            description={`This is Update Product Action Page`}
            className="container-fluid"
        >

        {JSON.stringify(categories)}
        </Layout>
    )

}

export default ManageCategories