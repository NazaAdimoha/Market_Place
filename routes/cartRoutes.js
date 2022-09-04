const cartRouter = require("express").Router();
const Cart = require("../models/cartModel");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const { log } = require("console");

/* create */
cartRouter.post("/newcart", verifyToken, async (req, res) => {
    const newcart = new Cart(req.body);
    try {
        const savedcart = await newcart.save()
        res.status(201).json(savedcart)
    } catch (err) {
        res.status(500).json(err);
    }
})

/* update */
cartRouter.put("/updatedcart/:id", verifyTokenAndAuthorization, async (req, res) => {

  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* delete cart */
cartRouter.delete(
  "/removecart/:id",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      await Cart.findByIdAndDelete(req.params.id);
      res.status(200).json("Cart has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

/* get cart */
productRouter.get("/findproduct/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* get all products */
// productRouter.get("/findallproducts", async (req, res) => {
//   const qNew = req.query.new;
//   const qCategory = req.query.category;
//   try {

//     let products;
//     if (qNew) {
//         products = await Product.find().sort({createdAt: -1}).limit(2);
//     } else if (qCategory) {
//         products = await Product.find({
//             categories: {
//                 $in: [qCategory],
//             }
//         })
//     } else {
//         products = await Product.find();
//     }
//     res.status(200).json(products);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = cartRouter;
