const mongoose = require('mongoose')

const MenuItemSchema = mongoose.Schema({
    name: { type:'String', details:'name', required: true },
    description: { type: 'String',details:'description' },
    price: { type: Number,details:'price', required: true },
    category: { type: 'String',details:'category', required: true }
});

const Menu_Items = mongoose.model('MenuItem',MenuItemSchema)

module.exports = Menu_Items