const express = require('express')
const {postlogdet} = require('../controllers/LoginControllers')

const router = express.Router();

router.post('/logindet',postlogdet);

module.exports = router;