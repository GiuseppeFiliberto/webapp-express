const express = require('express')
const router = express.Router()
const moviesController = require('../controllers/moviesController')

//Index route
router.get('/', moviesController.index)

//Show route
router.get('/:id', moviesController.show)


//Store Route
router.post('/:id/reviews', moviesController.store)


module.exports = router