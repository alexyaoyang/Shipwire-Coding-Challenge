const express = require("express"),
      router = express.Router(),
      product = require("../models/product.js");
 
router.get("/", (req, res) => { //show all products
  product.find({}, (err, data) => {
    if (err) {
      res.send("failed");
      return console.error(err);
    }
    res.send(data);
  });
}).get("/:id", (req, res) => { //find a single product
  product.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.send("failed");
      return console.error(err);
    }
    res.send(data[0]);
  });
}).post("/", (req, res) => { // create product
  const model = new product(req.body);
  model.save((err) => {
    if (err) {
      res.send("failed");
      return console.error(err);
    }
    res.send("created");
  });
}).put("/:id", (req, res) => { //update product
  const obj = req.body;
  product.findByIdAndUpdate(req.params.id, { name: obj.name, 
    description: obj.description, width: obj.width, 
    length: obj.length, height: obj.height, 
    weight: obj.weight, value: obj.value}, 
  (err) => {
    if (err) {
      res.send("failed");
      return console.error(err);
    }
    res.send("updated");
  });
}).delete("/:id", (req, res) => { //delete product
  product.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.send("failed");
      return console.error(err);
    }
    res.send("deleted");
  });
});
 
module.exports = router;