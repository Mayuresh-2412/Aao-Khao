const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email:{type:'String',details:'email'},
    password : {type:'String',details:'password' }
})
const Res_User = mongoose.model('User',userSchema)

module.exports = Res_User