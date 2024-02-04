const express = require('express');
const { getProductsTesting , getProducts} = require('../Controllers/products');

const router = express.Router();

router.route("/").get(getProducts);

router.route('/testing').get(getProductsTesting);

module.exports = router;