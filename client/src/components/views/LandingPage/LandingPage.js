import { Button, Card, Col, Icon, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import Axios from 'axios';
import React, { useState, useEffect } from 'react'
import ImageSlider from '../../utils/ImageSlider';

function LandingPage() {
    const [Products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await Axios.get("/api/product/getProducts");

                if (response.data.success) {
                    setProducts(response.data.products);
                } else {
                    alert("Failed to fetch products");
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchProducts();
    }, [])

    const renderCards = Products.map((product, index) => (
        <Col lg={6} md={8} xs={24} key={index}>
            <Card hoverable={true} cover={<ImageSlider images={product.images} />}>
                <Meta
                    title={product.title}
                    description={`$${product.price}`}
                />
            </Card>
        </Col>

    ));

    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>Let's Travel Anywhere <Icon type="rocket" /></h2>
            </div>

            {/* Search */}

            {/* Filter */}


            {Products.length === 0 ?
                <div style={{
                    display: 'flex', height: '300px',
                    alignItems: 'center', justifyContent: 'center'
                }}>
                    <h2>No products yet...</h2>
                </div> :
                <div>
                    <Row gutter={[16, 16]}>
                        {renderCards}
                    </Row>
                </div>
            }

            <br />

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button>Load more...</Button>
            </div>
        </div>
    )
}

export default LandingPage
