const Sign_Up_Schm = require('../models/SignUp')

exports.postlogdet = async(req,res) =>{
    const {email,password} = req.body
    try{
        const logdet = await Sign_Up_Schm.create({email,password});
        res.status(200).json(logdet)

    }catch(error){
        res.status(500).json({message:error})

    }
}

