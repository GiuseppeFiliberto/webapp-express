const express = require('express')
const router = express.Router()
const moviesController = require('../controllers/moviesController')

//Index route
router.get('/', moviesController.index)

module.exports = router