import React, { useEffect, useState } from 'react'
import UserCardBlock from './Sections/UserCardBlock'
import { Empty, Result } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { getCartItems, removeCartItem } from '../../../_actions/user_actions';

const CartPage = (props) => {
    const [total, setTotal] = useState(0);
    const [showTotal, setShowTotal] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const { userData, cartDetail } = props.user;

    const dispatch = useDispatch();
    const cartDetails = useSelector((state) => state.user.cartDetail);

    useEffect(() => {

        async function fetchCart() {
            let cartItems = [];
            if (userData && userData.cart) {
                if (userData.cart.length > 0) {
                    userData.cart.forEach(cartItem => {
                        cartItems.push(cartItem.id)
                    });

                    dispatch(getCartItems(cartItems, userData.cart));
                }
            }

        }

        fetchCart();
    }, [userData]);


    const calculateTotal = async (cartDetail) => {
        let total = 0;

        await cartDetail && cartDetail.map((item) => {
            total += parseInt(item.price) * item.quantity;
        });
        
        setTotal(total);
        total > 0 ? setShowTotal(true) : setShowTotal(false);
    };

    calculateTotal(cartDetails)


    const removeFromCart = async (id) => {
        dispatch(removeCartItem(id));
    }

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h1>My Cart</h1>

            <div>

                <UserCardBlock
                    cartDetails={cartDetail}
                    removeItem={removeFromCart}
                />

                {
                    showTotal ?
                        <div style={{ marginTop: '3rem' }}>
                            <h2>Total Amount: $ {total}</h2>
                        </div> :

                    showSuccess ?

                        <Result
                            status="success"
                            title="Successfully Purchased Items"
                        /> :

                        <div style={{
                            width: '100%', display: 'flex',
                            flexDirection: 'column', justifyContent: "center"
                        }}>
                            <Empty description={false} />
                            <p>No Item(s) in Cart</p>
                        </div>

                }

            </div>
        </div>
    )
}

export default CartPage