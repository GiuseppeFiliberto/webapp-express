const express = require('express')
const router = express.Router()
const moviesController = require('../controllers/moviesController')

//Index route
router.get('/', moviesController.index)

//Show route
router.get('/:id', moviesController.show)

module.exports = router