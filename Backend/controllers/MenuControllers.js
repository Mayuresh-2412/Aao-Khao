const Menu_Items = require('../models/MenuItems')

exports.getAllMenuItems = async(req,res) =>{
    try{
        const menuItems = await Menu_Items.find();
        res.status(200).json(menuItems);

    }catch(error){
        res.status(500).json({ message: error.message });
    }
}
exports.postMenuItems = async (req, res) => {
    const {name ,description,price, category } = req.body;
    try {
        const postmenu = await Menu_Items.create({ name ,description,price, category })
        res.status(200).json({ postmenu })

    } catch (error) {
        res.status(500).json({ message: error })

    }
}