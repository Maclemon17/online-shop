import { Col, Icon, Row } from 'antd';
import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProductInfo from './Sections/ProductInfo';
import ProductImage from './Sections/ProductImage';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../_actions/user_actions';


const ProductDetailsPage = (props) => {
    const [productDetail, setProductDetail] = useState([])

    const { productId } = props.match.params;
    const dispatch = useDispatch();

    useEffect(() => {
        getProductDetails();

    }, []);

    const getProductDetails = async () => {
        try {
            const { data } = await Axios.post(`/api/product/products_details?productId=${productId}&type=single`);
            console.log(data);
            if (data.success) {
                console.log(data.product);
                setProductDetail(data.product[0]);
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleAddToCart = (productId) => {
        dispatch(addToCart(productId))
        // console.log(productId);
    }

    return (
        // use a loader from antd
        <div className='productDetails' style={{ width: '100%', padding: '3rem 4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem auto' }}>
                <h1>{productDetail.title}</h1>
            </div>

            {/* <Icon type="loading"/> */}

            <Row style={{ display: 'flex', justifyContent: 'space-around' }} gutter={[16, 16]}>
                <Col lg={9} xs={24}>
                    <ProductImage details={productDetail} />
                </Col>

                <Col lg={12} xs={24}>
                    <ProductInfo
                        addToCart={handleAddToCart}
                        details={productDetail}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default ProductDetailsPage