const express = require('express');
const router = express.Router();
const multer = require("multer");

const { auth } = require("../middleware/auth");
const { Product } = require('../models/Product');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },

    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },

    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end("only jpg, png are allowed"), false);
        }
        cb(null, true);
    },
});

var upload = multer({ storage: storage }).single("file");

//=================================
//             Product
//=================================

router.post("/uploadImage", auth, (req, res) => {

    upload(req, res, err => {
        // console.log(req.body);
        // console.log(res.body);
        if (err) {
            return res.json({ success: false, err })
        }

        return res.json({
            success: true,
            image: res.req.file.path,
            fileName: res.req.file.filename
        })
    })
});


router.post("/uploadProduct", auth, async (req, res) => {

    try {
        const products = new Product(req.body);

        await products.save();

        return res.status(201).json({ success: true, products });
    } catch (error) {
        console.log(error);

        return res.status(400).json({ success: false, error })
    }
});


router.post("/getProducts", auth, async (req, res) => {
    const { skip, limit, order, sortBy, filters } = req.body;


    try {

        let ORDER = order ? order : "desc",
            SORT_BY = sortBy ? sortBy : "_id",
            SKIP = parseInt(skip),
            LIMIT = limit ? parseInt(limit) : 100;

        let findArgs = {};

        for (const key in filters) {
            if (Object.hasOwnProperty.call(filters, key)) {
                if (key === 'price') {
                    // console.log("price");
                } else {
                    findArgs[key] = filters[key];
                    // console.log(findArgs);
                }

            }
        }

        const products = await Product.find(findArgs)
            .populate("writer")
            .sort([[SORT_BY, ORDER]])
            .skip(SKIP)
            .limit(LIMIT)
            .exec();

        return res.status(200).json({ success: true, products, size: products.length })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error })
    }
})



module.exports = router;
