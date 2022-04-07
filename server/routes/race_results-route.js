// Import express
const express = require('express')

// Import race_results-controller
const race_resultsRoutes = require('../controllers/race_results-controller.js')

// Create router
const router = express.Router()

// Add route for GET request to retrieve all race_result
// In server.js, race_results route is specified as '/race_results'
// this means that '/all' translates to '/race_results/all'
router.get('/all', race_resultsRoutes.race_resultsAll);
router.get('/results_report', race_resultsRoutes.race_results_report_data);


// Add route for POST request to create new race_result
// In server.js, race_results route is specified as '/race_results'
// this means that '/create' translates to '/race_results/create'
router.post('/create', race_resultsRoutes.race_resultsCreate)

// Add route for PUT request to delete specific race_result
// In server.js, race_results route is specified as '/race_results'
// this means that '/delete' translates to '/race_results/delete'
router.put('/delete', race_resultsRoutes.race_resultsDelete)

// Add route for PUT request to reset race_resultshelf list
// In server.js, race_results route is specified as '/race_results'
// this means that '/reset' translates to '/race_results/reset'
router.put('/reset', race_resultsRoutes.race_resultsReset)

// Export router
module.exports = router
