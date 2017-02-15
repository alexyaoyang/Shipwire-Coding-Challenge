const mongoose = require("mongoose"),
      Schema = mongoose.Schema,
      objectId = mongoose.Schema.ObjectId;

const productSchema = Schema({
  _id             : { type: objectId, auto: true },
  name            : { unique: true, type: String, required: true },
  description     : String,
  width           : Number,
  length          : Number,
  height          : Number,
  weight          : Number,
  value           : { type: Number, required: true }
});

const product  = mongoose.model('Product', productSchema);

module.exports = product;