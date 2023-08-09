import { Button, Card, Col, Icon, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import Axios from 'axios';
import React, { useState, useEffect } from 'react'
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Sections/CheckBox';

function LandingPage() {
    const [Products, setProducts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(8);
    const [postSize, setPostSize] = useState(0)

    useEffect(() => {
        const queries = {
            skip: skip,
            limit: limit,
        }

        fetchProducts(queries);
    }, []);

    const fetchProducts = async (queries) => {
        try {
            const response = await Axios.post("/api/product/getProducts", queries);
            const { products, success, size } = response.data;

            if (success) {
                setProducts(products);
                setPostSize(size)
                // console.log(object);
            } else {
                alert("Failed to fetch products");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const loadMore = () => {
        let Skip = skip + limit;

        const queries = {
            skip: Skip,
            limit: limit
        }

        fetchProducts(queries);
        setSkip(Skip);
    }


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

            {/* Filter */}
            <CheckBox />
            
            {/* Search */}

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
                {postSize >= 8 && <Button onClick={loadMore}>Load more...</Button>}
            </div>
        </div>
    )
}

export default LandingPage
