const express = require('express');
const router = express.Router();
const multer = require("multer");

const { auth } = require("../middleware/auth");
const { Product } = require('../models/Product');
const { User } = require('../models/User');

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


router.post("/getProducts", async (req, res) => {
    const { skip, limit, order, sortBy, filters, searchQuery } = req.body;
    // console.log("REQUEST>>>> ", req.body);
    try {

        let ORDER = order ? order : "desc",
            SORT_BY = sortBy ? sortBy : "_id",
            SKIP = parseInt(skip),
            LIMIT = limit ? parseInt(limit) : 100;

        // let findArgs = {};

        /*  for (const key in filters) {
             // console.log("FILTERS", filters);
 
             if (Object.hasOwnProperty.call(filters, key)) {
                 if (key === 'price' && filters[key].length != 0) {
                     // console.log("! EMPTY PRICE>>>");
 
                     // findArgs[key] = {
                     //     $gte: filters[key][0],  //   GREATER THAN OR EQUAL
                     //     $lte: filters[key][1]   //  LESS THAN OR EQUAL
                     // }
                     // console.log("KEY PRICE", filters[key]);
                 } else {
                     findArgs[key] = filters['continent']
                     console.log(">>> key",filters[key]);
                 }
             }
             // console.log(">>>>", findArgs);
 
         }
 
         console.log("ARGS:", findArgs); */

        // CHECK IF SEARCH QUERY IS SENT
        // if (searchQuery) {

        //     const products = await Product.find(findArgs)
        //         .find({ $text: { $search: searchQuery } })
        //         .populate({ path:'writer', select: "-password"})
        //         .sort([[SORT_BY, ORDER]])
        //         .skip(SKIP)
        //         .limit(LIMIT)
        //         .exec();

        //     return res.status(200).json({ success: true, products, size: products.length })
        // } else {
        const products = await Product.find()
            .populate({ path: 'writer', select: "-password" })
            .sort([[SORT_BY, ORDER]])
            .skip(SKIP)
            .limit(LIMIT)
            .exec();

        // console.log(products);
        return res.status(200).json({ success: true, products, size: products.length })
        // }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error })
    }
});


router.post("/products_details", async (req, res) => {
    let { productId, type } = req.query;
   
    try {

        if (type === 'array') {
            let ids = productId.split(',');

            productId = [];
            productId = ids.map(id => {
                return id;
            });
        }

        // for type = single fetch with just an id
        const product = await Product.find({ '_id': { $in: productId } })
            .populate({ path: 'writer', select: "-password" }).exec();
        // console.log(product);

        return res.status(200).json({ success:true, product});
    } catch (error) {
        console.log(error);
    }


});



module.exports = router;
