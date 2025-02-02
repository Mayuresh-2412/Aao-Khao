const express = require('express');
const { orderRoutes } = require('../controllers/orderController'); // Import the function

const router = express.Router();

// Correctly attach the function to the route
router.post('/orders', orderRoutes);

module.exports = router;

