import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_CART_USER,
    GET_CART_ITEMS_USER,
    REMOVE_CART_ITEM_USER,
} from './types';
import { PRODUCT_SERVER, USER_SERVER } from '../components/Config.js';

export function registerUser(dataToSubmit) {
    const request = axios.post(`${USER_SERVER}/register`, dataToSubmit)
        .then(response => response.data);

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit) {
    const request = axios.post(`${USER_SERVER}/login`, dataToSubmit)
        .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth() {
    const request = axios.get(`${USER_SERVER}/auth`)
        .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser() {
    const request = axios.get(`${USER_SERVER}/logout`)
        .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

export function addToCart(id) {
    const request = axios.post(`${USER_SERVER}/add_to_cart?productId=${id}`)
        .then(response => response.data);

    return {
        type: ADD_TO_CART_USER,
        payload: request
    }
}

export function getCartItems(cartItems, userCart) {

    const request = axios.post(`${PRODUCT_SERVER}/products_details?productId=${cartItems}&type=array`)
        .then(response => {
            // make a cartDetail field in store 
            // with product qty to products from collection

            const { product } = response.data;

            userCart.forEach(cartItem => {
                // add quantity (from cart) field to the response data
                product.forEach((productDetail, i) => {
                    if (cartItem.id === productDetail._id) {
                        product[i].quantity = cartItem.quantity;
                    }
                });
            });

            return product;
        });

    return {
        type: GET_CART_ITEMS_USER,
        payload: request
    }
}

export function removeCartItem(itemId) {

    const request = axios.post(`${USER_SERVER}/remove_from_cart?productId=${itemId}`)
        .then(response => {
            response.data.cart.forEach(cart => {
                response.data.cartDetails.forEach((cartDetail,i) => {
                    if (cart.id === cartDetail._id) {
                        response.data.cartDetails[i].quantity = cart.quantity
                    }
                })
            });

            return response.data;
        });

    return {
        type: REMOVE_CART_ITEM_USER,
        payload: request
    }
}
