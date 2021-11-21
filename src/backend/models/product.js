const mongoose = require("mongoose");
const Joi = require("joi");

const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    name: { type: String, required: true, minlength: 4, maxlength: 25 },
    price: { type: Number, required: true, min: 1 },
    description: String,
    thumbnail: String,
  })
);

function validateProduct(product) {
  const schema = Joi.object({
    name: Joi.string().required().min(4).max(25),
    price: Joi.number().required().min(1),
    description: Joi.string().max(256),
    thumbnail: Joi.string(),
  });

  return schema.validate(product);
}

exports.Product = Product;
exports.validateProduct = validateProduct;
