import { Button, Descriptions } from 'antd'
import React, { useEffect, useState } from 'react'

const ProductInfo = ({ details, addToCart }) => {

    const [productDetails, setProductDetails] = useState({});

    useEffect(() => {
        setProductDetails(details);
    }, [details]);

    const handleCart = () => {
        addToCart(details._id); // SEND PRODUCT ID TO PARENT COMP
    }

    return (
        <div>
            <Descriptions title="Product Info">
                <Descriptions.Item label="Price">${productDetails.price}</Descriptions.Item>
                <Descriptions.Item label="Sold">{productDetails.sold}</Descriptions.Item>
                <Descriptions.Item label="View">{productDetails.views}</Descriptions.Item>
                <Descriptions.Item label="Description">{productDetails.description}</Descriptions.Item>
            </Descriptions>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5rem' }}>
                <Button size='large' shape='round' type='danger'
                    onClick={handleCart}
                >
                    Add to Cart
                </Button>
            </div>
        </div>
    )
}

export default ProductInfo