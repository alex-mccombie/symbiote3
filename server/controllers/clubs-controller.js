// Import database
const { collapseTextChangeRangesAcrossMultipleVersions } = require('typescript');
const knex = require('../db')

// Retrieve all clubs
exports.clubsAll = async (req, res) => {
  // Get all clubs from database
  knex
    .select('*') // select all records
    .from('clubs') // from 'clubs' table
    .then(userData => {
      // Send clubs extracted from database in response
      //console.log('clubsAll:',userData);
      res.json(userData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving clubs: ${err}` })
    })
}

// Create new club
exports.clubsCreate = async (req, res) => {
  // Add new club to database
  knex('clubs')
    .insert({ // insert new record
      'club_title': req.body.club_title,
      'club_address': req.body.club_address
    })
    .then(() => {
      // Send a success message in response
      res.json({ message: `club \'${req.body.firstname} ${req.body.surname}\' created.` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error creating club ${req.body.surname} club: ${err}` })
    })
}

// Remove specific club
exports.clubsDelete = async (req, res) => {
  // Find specific club in the database and remove it
  knex('clubs')
    .where('id', req.body.id) // find correct record based on id
    .del() // delete the record
    .then(() => {
      // Send a success message in response
      res.json({ message: `club ${req.body.id} deleted.` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error deleting ${req.body.id} club: ${err}` })
    })
}

// Remove all clubs on the list
exports.clubsReset = async (req, res) => {
  // Remove all clubs from database
  if (1) {
    console.log('clubsReset blocked for safety');
  }else { // Preventing deletes
    knex
      .select('*') // select all records
      .from('clubs') // from 'clubs' table
      .truncate() // remove the selection
      .then(() => {
        // Send a success message in response
        res.json({ message: 'club list cleared.' })
      })
      .catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error resetting club list: ${err}.` })
      })
  };
}
