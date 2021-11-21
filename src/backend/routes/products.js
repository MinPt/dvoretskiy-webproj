const express = require("express");
const { Product, validateProduct } = require("../models/product");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();

//Storage
const storage = multer.diskStorage({
  destination: "./public/images/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jgf|png|gif/;

    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) return cb(null, true);
    cb("Error: Invalid image type");
  },
}).single("image");

//Routes
router.get("/", async (req, res) => {
  const products = await Product.find().sort("name");
  res.send(products);
});

router.get("/:id", async (req, res) => {
  const product = Product.findById(req.params.id);

  if (!product) return res.status(404).send("User with such id not found");

  req.send(product);
});

router.post("/", auth, async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.status(400).send(err);
    }
    let thumbnail = req.file?.filename;
    if (req.file === undefined) thumbnail = "placeholder.png";
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let product = new Product({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      thumbnail: thumbnail,
    });
    product = await product.save();
    res.send(product);
  });
});

router.put("/:id", auth, async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.status(400).send(err);
    }
    let thumbnail = req.file?.filename;
    if (req.file === undefined) thumbnail = req.body.thumbnail;

    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        thumbnail: thumbnail,
      },
      { new: true }
    );

    if (!product) return res.status(404).send("Product with such id not found");

    res.send(product);
  });
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) return res.status(404).send("User with such id not found");
  if (product.thumbnail !== "placeholder.png") {
    fs.unlinkSync(`public/images/${product.thumbnail}`);
  }
  res.send(product);
});

module.exports = router;
