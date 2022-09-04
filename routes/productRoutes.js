const productRouter = require("express").Router();
const Product = require("../models/productModel");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const { log } = require("console");

/* create */
productRouter.post("/newproducts", verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save()
        res.status(201).json(savedProduct)
    } catch (err) {
        res.status(500).json(err);
    }
})

/* update */
productRouter.put("/updatedproducts/:id", verifyTokenAndAdmin, async (req, res) => {

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* delete product */
productRouter.delete(
  "/removeproduct/:id",
  verifyTokenAndAdmin,
  async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json("Product has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

/* get product */
productRouter.get("/findproduct/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* get all products */
productRouter.get("/findallproducts", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {

    let products;
    if (qNew) {
        products = await Product.find().sort({createdAt: -1}).limit(2);
    } else if (qCategory) {
        products = await Product.find({
            categories: {
                $in: [qCategory],
            }
        })
    } else {
        products = await Product.find();
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = productRouter;
