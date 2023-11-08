import { Button } from 'antd';
import React from 'react'

const UserCardBlock = ({ cartDetails, removeItem }) => {

    // const img = loc

    const cartItems = cartDetails && cartDetails.map(cartItem => (
        <tr key={cartItem._id}>
            <td>
                <img style={{ width: '70px' }}
                    src={`http://localhost:5000/${cartItem.images[0]}`}
                    alt="product-img"
                />
            </td>

            <td>{cartItem.quantity} EA</td>
            <td>${cartItem.price}</td>

            <td>
                <Button type='danger'
                    onClick={() => removeItem(cartItem._id)}
                >Remove</Button>
            </td>
        </tr>
    ))

    console.log(cartItems);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Product Image</th>
                        <th>Product Quantity</th>
                        <th>Product Price</th>
                        <th>Actions</th>
                    </tr>

                </thead>

                <tbody>
                    {cartItems}
                </tbody>
            </table>

        </div>
    )
}

export default UserCardBlock