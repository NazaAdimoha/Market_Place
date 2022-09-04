const userRouter = require("express").Router();
const hashPassword = require("../utils/password");
const User = require("../models/userModel");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const { log } = require("console");

/* update */
userRouter.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = await (
      await hashPassword(req.body.password)
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* delete */
userRouter.delete(
  "/remove/:id",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      res.status(200).json(deletedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

/* get user */
userRouter.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* get all users */
userRouter.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(2)

      : await User.find()
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* Get stats */
userRouter.get("/stats", verifyTokenAndAdmin, async (req, res) => { 
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        /* use mongoDB aggregation framework to get stats */
        const data = await User.aggregate([
            {
              '$match': {
                'createdAt': {
                  '$gte': new Date('Sat, 01 Jan 2022 00:00:00 GMT')
                }
              }
            }, {
              '$project': {
                'month': {
                  '$month': '$createdAt'
                }
              }
            }, {
              '$group': {
                '_id': '$month', 
                'total': {
                  '$sum': 1
                }
              }
            }
          ]);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = userRouter;
