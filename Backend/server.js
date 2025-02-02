const express = require('express');
const connect = require('./config/db');
const menuRoutes = require('./routes/menuRoutes');
const loginRoutes = require('./routes/loginRoutes');
const orderRoutes = require('./routes/orders');  // Added orders route
const cors = require('cors');

const app = express();

require('dotenv').config();

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;

connect();

app.use(cors());
app.use(express.json());
app.use('/api', menuRoutes);
app.use('/api', loginRoutes);
app.use('/api', orderRoutes); // Added order routes

app.listen(port, () => {
  console.log(`We are listening to the port ${port}`);
});
