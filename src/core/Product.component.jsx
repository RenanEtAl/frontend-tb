import React, { useState, useEffect } from 'react';
import Layout from './Layout.component';
import { read, listRelated } from './apiCore';
import Card from './card/Card.component';

const Product = (props) => {
    const [product, setProduct] = useState({})
    const [error, setError] = useState(false)
    const [relatedProduct, setRelatedProduct] = useState([])

    const loadingSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProduct(data)
                // fetch related products based on category
                listRelated(data._id).then(data => {
                    if (data.error) {
                        setError(data.error)
                    } else {
                        setRelatedProduct(data)
                    }
                })
            }
        })
    }

    useEffect(() => {
        // grab product id from url
        const productId = props.match.params.productId
        loadingSingleProduct(productId)
    }, [props]) // added props inside the array so whenever the query/link changes, the single product card updates

    return (
        <Layout
            title={product && product.name}
            description={product && product.description && product.description.substring(0, 100)}
            className="container-fluid"
        >
            <div className="row">
                <div className="col-8">
                    {product && product.description && <Card product={product}
                        showViewProductButton={false} />
                    }
                </div>

                <div className="col-4">
                    <h4>Related Products</h4>
                    {relatedProduct.map((p, i) => (
                        <div className="mb-3" key={i}>
                            <Card product={p} />
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )

}

export default Product