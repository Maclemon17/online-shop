const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");
const { Product } = require('../models/Product');

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
        cart: req.user.cart,
        history: req.user.history
    });
});

router.post("/register", (req, res) => {

    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});


router.post("/add_to_cart", auth, async (req, res) => {
    const { productId } = req.query;
    const { _id: userId } = req.user;

    try {
        // get logged in user to fetch the cart items
        const userInfo = await User.findOne({ "_id": userId });

        let duplicate = false;

        // check if product already exists in cart
        userInfo.cart.forEach((cartItem) => {
            if (cartItem.id === productId) {
                duplicate = true;
            }
        });

        // increase item count if already in cart
        if (duplicate) {
            try {
                await User.findOneAndUpdate(
                    { "_id": userId, "cart.id": productId },
                    { $inc: { "cart.$.quantity": 1 } }, { new: true }
                );

                return res.status(201).json(userInfo.cart)
            } catch (error) {
                console.log("FAILED TO UPDATE", error);
                return res.status(400).json({ success: false, error });
            }
        } else {
            // push product item to cart 
            try {
                await User.findOneAndUpdate(
                    { "_id": userId },
                    {
                        $push: {
                            cart: {
                                id: productId,
                                quantity: 1,
                                date: Date.now()
                            }
                        }
                    }, { new: true }
                );

                return res.status(201).json(userInfo.cart);
            } catch (error) {
                console.log(error);
                return res.status(400).json({ success: false, error });
            }
        }

    } catch (error) {
        console.log("ERROR: Unable to add item to cart", error);
    }
});


router.post('/remove_from_cart', auth, async (req, res) => {
    const cartItemId = req.query.productId;
    const userId = req.user._id;

    try {
        const userInfo = await User.findOneAndUpdate({ "_id": userId },
            {
                "$pull": { "cart": { "id": cartItemId } }
            }, { new: true }
        ).select("-password");

        let cart = userInfo.cart;
        let cartIds = cart.map(item => {
            return item.id
        });

        const cartDetails = await Product.find({ '_id': { $in: cartIds } })
        .populate('writer').exec();
        
        return res.status(200).json({
            cartDetails,
            cart
        })

    } catch (error) {
        console.log("Unable to remove item from cart",error);
        return res.status(400).json({ success: false, error });
    }
})



module.exports = router;
