const orderRouter = require("express").Router();
const Order = require("../models/orderModel");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const { log } = require("console");

/* create order */
orderRouter.post("/neworder", verifyToken, async (req, res) => {
    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save()
        res.status(201).json(savedOrder)
    } catch (err) {
        res.status(500).json(err);
    }
})

/* update order*/
orderRouter.put("/updatedorder/:id", verifyTokenAndAdmin, async (req, res) => {

  try {
    const updatedorder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* delete cart */
orderRouter.delete(
  "/removeorder/:id",
  verifyTokenAndAdmin,
  async (req, res) => {
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json("Cart has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

/* get user cart */
orderRouter.get("/findorders/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const orders = await Order.find({userId: req.params.userId});
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* get all carts */

orderRouter.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(carts);
    } catch (err) {
        res.status(500).json(err);
    }
})

/* get monthly income */
orderRouter.get("/income", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                },
            },
        ]);
        res.status(200).json(income);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = orderRouter;
