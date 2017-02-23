{
  'use strict';
  const express = require("express"),
        router = express.Router(),
        order = require("../models/order.js"),
        product = require("../models/product.js"),
        request = require("request"),
        querystring = require('querystring');
   
  router.get("/:address/:city/:state/:zipcode", (req, res) => { //check address
    const data = querystring.stringify({
      'auth-id': process.env.AUTH_ID,
      'auth-token': process.env.AUTH_TOKEN,
      'street': req.params.address,
      'city': req.params.city,
      'state': req.params.state,
      'zipcode': req.params.zipcode
    });
    request('https://us-street.api.smartystreets.com/street-address?'+data, (err, response, data) => {
      if (err) {
        res.send("failed");
        return console.error(err);
      }
      res.send(data);
    })
  }).get("/", (req, res) => { //show all orders
    order.find({}, (err, data) => {
      if (err) {
        res.send("failed");
        return console.error(err);
      }
      res.send(data);
    });
  }).get("/:id", (req, res) => { //find a single order
    order.find({ _id: req.params.id }, (err, data) => {
      if (err) {
        res.send("failed");
        return console.error(err);
      }
      res.send(data[0]);
    });
  }).post("/", (req, res) => { // create order
    const model = new order(req.body);
    model.save((err) => {
      if (err) {
        res.send("failed");
        return console.error(err);
      }
      res.send("created");
    });
  }).put("/:id", (req, res) => { //update order
    const obj = req.body;
    order.findByIdAndUpdate(req.params.id, { recipientName: obj.recipientName, 
      streetAddress: obj.streetAddress, city: obj.city, 
      state: obj.state, zipcode: obj.zipcode, phoneNumber: obj.phoneNumber,
      product: obj.product, quantity: obj.quantity}, 
    (err) => {
      if (err) {
        res.send("failed");
        return console.error(err);
      }
      res.send("updated");
    });
  }).delete("/:id", (req, res) => { //delete order
    order.findByIdAndRemove(req.params.id, (err) => {
      if (err) {
        res.send("failed");
        return console.error(err);
      }
      res.send("deleted");
    });
  });
   
  module.exports = router;
}