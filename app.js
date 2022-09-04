const express = require('express');
const dotenv = require('dotenv');
const connectDB = require("./mongoose/database");
const userRouter = require("./routes/userRoutes");
const authRouter = require('./routes/auth');
const cartRouter = require('./routes/cartRoutes');
const productRouter = require('./routes/productRoutes');

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);

const PORT = process.env.PORT || 4949;



app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})