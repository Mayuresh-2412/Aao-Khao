const mongoose = require('mongoose')

const SignUp = mongoose.Schema({
    email: {type:'String',details:'email',required:true},
    password: {type:'String',details:'password',required:true}
})

const Sign_Up_Schm = mongoose.model('SignUpData',SignUp)

module.exports = Sign_Up_Schm