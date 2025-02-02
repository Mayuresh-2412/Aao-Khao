const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    items: [{ name: String, price: Number }],
    total: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
