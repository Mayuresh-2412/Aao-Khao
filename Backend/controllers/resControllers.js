const Res_User = require('../models/userSchema')

exports.getUserCred = async (req, res) => {
    try {
        const user = await Res_User.find()
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error })

    }
}

exports.postUserCred = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Res_User.create({ email, password })
        res.status(200).json({ message: 'user added successfully' })

    } catch (error) {
        res.status(500).json({ message: error })

    }
}

