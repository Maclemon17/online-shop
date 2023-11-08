import { Button, Card, Col, Icon, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import Axios from 'axios';
import React, { useState, useEffect } from 'react'
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Sections/CheckBox';
import RadioBox from './Sections/RadioBox';
import { PriceList } from '../../utils/Datas';
import SearchProducts from './Sections/SearchProducts';
import { Link } from 'react-router-dom';

function LandingPage() {
    const [Products, setProducts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(8);
    const [postSize, setPostSize] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [Filters, setFilters] = useState({
        continent: [],
        price: []
    });

    useEffect(() => {
        const queries = {
            skip: skip,
            limit: limit,
        }

        fetchProducts(queries);
    }, []);

    const fetchProducts = async (queries = {}) => {
        try {
            const response = await Axios.post("/api/product/getProducts", queries);
            const { products, success, size } = response.data;
            console.log(response);

            if (success) {
                setProducts(products); // spread Productsa
                setPostSize(size)
            } else {
                alert("Failed to fetch products");
            }
        } catch (error) {
            // alert("Failed to fetch products");
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

    const showFilteredPoducts = (filters = {}) => {

        const queries = {
            skip: 0,
            limit: limit,
            filters: filters
        }

        fetchProducts(queries);
        setSkip(0);
    }

    const filterContinents = (filters = {}, category = "") => {
        const newFilters = { ...Filters };
        // console.log(newFilters);
        newFilters[category] = filters;

        if (category === 'price') {
            console.log("PRICE >>>>>>>");
            let priceValues = filterPrice(filters);
            newFilters[category] = priceValues;
        }

        console.log(newFilters);
        showFilteredPoducts(newFilters);
        setFilters(newFilters);
    }


    const filterPrice = (filterValue) => {
        console.log("FILTER PRICE: ", filterValue);
        const data = PriceList;
        let priceArray = [];

        for (const key in data) {
            if (Object.hasOwnProperty.call(data, key)) {
                if (data[key]._id === parseInt(filterValue, 10)) {
                    priceArray = data[key].array;
                }
                console.log("price array", priceArray);
            }
        }

        return priceArray;
    }

    const searchProducts = (newQuery) => {

        const queries = {
            skip: 0,
            limit: limit,
            filters: Filters,
            searchQuery: newQuery
        }

        setSkip(0);
        setSearchQuery(newQuery);

        fetchProducts(queries);
    }


    const renderCards = Products.map((product, index) => (
        <Col lg={6} md={8} xs={24} key={index}>
            <Card hoverable={true}
                cover={
                    <Link to={`/product/${product._id}`} >
                        <ImageSlider images={product.images} />
                    </Link>
                }>
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
            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                    {/* BY CONTINENT */}
                    <CheckBox
                        handleFilters={(filters) => filterContinents(filters, "continent")}
                    />
                </Col>

                <Col lg={12} xs={24}>
                    {/* BY PRICE */}
                    <RadioBox
                        handleFilters={(filters) => filterContinents(filters, "price")}
                    />
                </Col>
            </Row>


            {/* Search bar*/}
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>
                <SearchProducts
                    searchProducts={searchProducts}
                />
            </div>

            {/* PRODUCTS */}
            {Products.length === 0 ?
                <div style={{
                    display: 'flex', height: '300px', width: '100%',
                    alignItems: 'center', justifyContent: 'center',
                }}>
                    <h2>No products yet...</h2>
                </div> :
                <div style={{ marginTop: '3rem' }}>
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
