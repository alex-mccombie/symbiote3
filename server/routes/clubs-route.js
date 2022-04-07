// Import express
const express = require('express')

// Import clubs-controller
const clubsRoutes = require('../controllers/clubs-controller.js')

// Create router
const router = express.Router()

// Add route for GET request to retrieve all club
// In server.js, clubs route is specified as '/clubs'
// this means that '/all' translates to '/clubs/all'
router.get('/all', clubsRoutes.clubsAll)

// Add route for POST request to create new club
// In server.js, clubs route is specified as '/clubs'
// this means that '/create' translates to '/clubs/create'
router.post('/create', clubsRoutes.clubsCreate)

// Add route for PUT request to delete specific club
// In server.js, clubs route is specified as '/clubs'
// this means that '/delete' translates to '/clubs/delete'
router.put('/delete', clubsRoutes.clubsDelete)

// Add route for PUT request to reset clubshelf list
// In server.js, clubs route is specified as '/clubs'
// this means that '/reset' translates to '/clubs/reset'
router.put('/reset', clubsRoutes.clubsReset)

// Export router
module.exports = router
