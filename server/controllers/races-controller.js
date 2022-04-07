// Import database
const { collapseTextChangeRangesAcrossMultipleVersions } = require('typescript');
const knex = require('../db')

// Retrieve all races
exports.racesAll = async (req, res) => {
  // Get all races from database
  knex
    .select('*') // select all records
    .from('races') // from 'races' table
    .then(userData => {
      // Send races extracted from database in response
      //console.log('racesAll:',userData);
      res.json(userData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving races: ${err}` })
    })
}

// Create new race
exports.racesCreate = async (req, res) => {
  // Add new race to database
  knex('races')
    .insert({ // insert new race record
      'race_title': req.body.race_title,
      'race_time': req.body.race_time,
      'race_address': req.body.race_address,
      'race_status': req.body.race_status
      //'rating': req.body.rating
    })
    .then(() => {
      // Send a success message in response
      res.json({ message: `race \'${req.body.firstname} ${req.body.surname}\' created.` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error creating race ${req.body.surname} race: ${err}` })
    })
}

// Remove specific race
exports.racesDelete = async (req, res) => {
  // Find specific race in the database and remove it
  knex('races')
    .where('id', req.body.id) // find correct record based on id
    .del() // delete the record
    .then(() => {
      // Send a success message in response
      res.json({ message: `race ${req.body.id} deleted.` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error deleting ${req.body.id} race: ${err}` })
    })
}

// Remove all races on the list
exports.racesReset = async (req, res) => {
  // Remove all races from database
  if (1) {
    console.log('racesReset blocked for safety');
  }else { // Preventing deletes
    knex
      .select('*') // select all records
      .from('races') // from 'races' table
      .truncate() // remove the selection
      .then(() => {
        // Send a success message in response
        res.json({ message: 'race list cleared.' })
      })
      .catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error resetting race list: ${err}.` })
      })
  };
}
