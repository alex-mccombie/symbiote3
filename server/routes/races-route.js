// Import express
const express = require('express')

// Import races-controller
const racesRoutes = require('../controllers/races-controller.js')

// Create router
const router = express.Router()

// Add route for GET request to retrieve all race
// In server.js, races route is specified as '/races'
// this means that '/all' translates to '/races/all'
router.get('/all', racesRoutes.racesAll)

// Add route for POST request to create new race
// In server.js, races route is specified as '/races'
// this means that '/create' translates to '/races/create'
router.post('/create', racesRoutes.racesCreate)

// Add route for PUT request to delete specific race
// In server.js, races route is specified as '/races'
// this means that '/delete' translates to '/races/delete'
router.put('/delete', racesRoutes.racesDelete)

// Add route for PUT request to reset raceshelf list
// In server.js, races route is specified as '/races'
// this means that '/reset' translates to '/races/reset'
router.put('/reset', racesRoutes.racesReset)

// Export router
module.exports = router
