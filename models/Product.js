/**
 * Mongoose Model for products collection
 */

"use strict";

const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  sku: {
    type: Number,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  shipping: {
    type: Number,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
