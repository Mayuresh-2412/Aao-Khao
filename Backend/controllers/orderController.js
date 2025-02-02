const Order = require('../models/Order');

const orderRoutes = async (req, res) => {
    try {
        console.log("Received Order Data:", req.body);

        const {items, total, date } = req.body;

        // Validate request body
        // if (!userId || !items?.length || !total) {
        //     return res.status(400).json({ message: 'Invalid order data' });
        // }

        // Create order in database
        const newOrder = await Order.create({items, total, date });

        res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    } catch (error) {
        console.error('Order placement error:', error);
        res.status(500).json({ message: error.message || 'Failed to place order' });
    }
};

// Correctly export the function
module.exports = { orderRoutes };
