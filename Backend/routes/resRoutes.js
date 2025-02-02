const express = require('express')
const {getUserCred, postUserCred} = require('../controllers/resControllers')

const router = express.Router()

router.get('/',getUserCred)

router.post('/',postUserCred)

module.exports = router