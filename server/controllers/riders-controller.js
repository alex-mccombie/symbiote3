// Import database
const { collapseTextChangeRangesAcrossMultipleVersions } = require('typescript');
const knex = require('../db')

// Retrieve all riders
exports.ridersAll = async (req, res) => {
  // Get all riders from database
  knex
    .select('*') // select all records
    .from('riders') // from 'riders' table
    .then(userData => {
      // Send riders extracted from database in response
      //console.log('ridersAll:',userData);
      res.json(userData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving riders: ${err}` })
    })
}

// Create new rider
exports.ridersCreate = async (req, res) => {
  // Add new rider to database
  knex('riders')
    .insert({ // insert new record, a rider
      'surname': req.body.surname,
      'firstname': req.body.firstname,
      'grading': req.body.grading,
      'age': req.body.age
      //'rating': req.body.rating
    })
    .then(() => {
      // Send a success message in response
      res.json({ message: `rider \'${req.body.firstname} ${req.body.surname}\' created.` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error creating rider ${req.body.surname} rider: ${err}` })
    })
}

// Remove specific rider
exports.ridersDelete = async (req, res) => {
  // Find specific rider in the database and remove it
  knex('riders')
    .where('id', req.body.id) // find correct record based on id
    .del() // delete the record
    .then(() => {
      // Send a success message in response
      res.json({ message: `rider ${req.body.id} deleted.` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error deleting ${req.body.id} rider: ${err}` })
    })
}

// Remove all riders on the list
exports.ridersReset = async (req, res) => {
  // Remove all riders from database
  if (1) {
    console.log('ridersReset blocked for safety');
  }else { // Preventing deletes
    knex
      .select('*') // select all records
      .from('riders') // from 'riders' table
      .truncate() // remove the selection
      .then(() => {
        // Send a success message in response
        res.json({ message: 'rider list cleared.' })
      })
      .catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error resetting rider list: ${err}.` })
      })
  };
}
