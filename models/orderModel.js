const mongoose = require('mongoose');

const orderModelSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    products: [
        {
            productId: {
                type: String,    
            },
            quantity: {
                type: Number,
                quantity: 1
            }
        }
    ],
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    }
}, { timestamps: true });

const Order = mongoose.model('Order', orderModelSchema);

module.exports = Order;