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

/* get user cart */
cartRouter.get("/findcart/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({userId: req.params.userId});
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* get all carts */

cartRouter.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = cartRouter;
