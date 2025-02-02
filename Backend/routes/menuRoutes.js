const express = require('express')
const {getAllMenuItems, postMenuItems} = require('../controllers/MenuControllers')

const router = express.Router()

router.get('/menu',getAllMenuItems)

router.post('/',postMenuItems)

module.exports = router