const mongoose = require('mongoose')

async function connect(){
    try{

        await mongoose.connect('mongodb://localhost:27017/Restaurant')
        console.log('we have successfully connected to the database')
    }catch(error){

        console.log(error)
    }
}

module.exports = connect