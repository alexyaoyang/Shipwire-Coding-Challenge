{
  'use strict';
  const mongoose = require("mongoose")
        Schema = mongoose.Schema
        objectId = mongoose.Schema.ObjectId

  const orderSchema = Schema({
    _id             : { type: objectId, auto: true },
    recipientName   : { type: String, required: true },
    streetAddress   : { type: String, required: true },
    city            : { type: String, required: true },
    state           : { type: String, required: true },
    zipCode         : { type: String, required: true },
    phoneNumber     : { type: String, required: true },
    product         : { type: objectId, ref: 'product', required: true },
    quantity        : { type: Number, required: true }
  });

  const order  = mongoose.model('Order', orderSchema)

  module.exports = order
}