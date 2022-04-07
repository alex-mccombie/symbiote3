// Import express
const express = require('express')

// Import riders-controller
const ridersRoutes = require('../controllers/riders-controller.js')

// Create router
const router = express.Router()

// Add route for GET request to retrieve all rider
// In server.js, riders route is specified as '/riders'
// this means that '/all' translates to '/riders/all'
router.get('/all', ridersRoutes.ridersAll)

// Add route for POST request to create new rider
// In server.js, riders route is specified as '/riders'
// this means that '/create' translates to '/riders/create'
router.post('/create', ridersRoutes.ridersCreate)

// Add route for PUT request to delete specific rider
// In server.js, riders route is specified as '/riders'
// this means that '/delete' translates to '/riders/delete'
router.put('/delete', ridersRoutes.ridersDelete)

// Add route for PUT request to reset ridershelf list
// In server.js, riders route is specified as '/riders'
// this means that '/reset' translates to '/riders/reset'
router.put('/reset', ridersRoutes.ridersReset)

// Export router
module.exports = router
