const express = require('express');
const dotenv = require('dotenv');
const connectDB = require("./mongoose/database");
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

const PORT = process.env.PORT || 4949;

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/carts", cartRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})