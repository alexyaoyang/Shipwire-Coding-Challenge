{
  'use strict';
  const express = require('express'),
        router = express.Router();
   
  //routes for product api
  router.use("/product", require("../controllers/product.api"));

  //routes for order api
  router.use("/order", require("../controllers/order.api"));
   
  module.exports = router;
}