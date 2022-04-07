// Import database
const { collapseTextChangeRangesAcrossMultipleVersions } = require('typescript');
const knex = require('../db')



// Retrieve the race results, with names, in sorted order
exports.race_results_report_data= async (req, res) => {
  // Get all race_results from database

  let RaceID = 2;
  let reportQuery =
    'SELECT race_results.rider_id,race_results.race_id,races.race_title,firstname,surname,race_position '
    + 'FROM race_results '
    + 'INNER JOIN riders ON race_results.rider_id = riders.rider_id '
    + 'INNER JOIN races ON race_results.race_id = races.race_id '
    + 'WHERE race_results.race_id = ' + RaceID + ' '
    + 'ORDER BY race_position; ';
;
  console.log('reportQuery:',reportQuery);
  //reportQuery='SELECT * FROM races;'
  knex.raw(reportQuery)
    .then(data => {
      console.log('knex raw query:', data);
      res.json(data)
    })
    .catch(err => console.log(err));

/*
  knex
    .db('riders')
    .join('race_results','race_results.rider_id','riders.rider_id')
    .select('race_results.rider_id', 'riders.firstname','riders.surname','race_results.race_position') // select all records
    .where({race_id:RaceID}) // from 'race_results' table
    .then(userData => {
      console.log('race_results_report_data:',userData);
      res.json(userData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving race_results_report_data: ${err}` })
    }) */
}




// Retrieve all race_resultss
exports.race_resultsAll = async (req, res) => {
  // Get all race_results from database
  knex
    .select('*') // select all records
    .from('race_results') // from 'race_results' table
    .then(userData => {
      // Send race_results extracted from database in response
      //console.log('race_resultsAll:',userData);
      res.json(userData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving race_results: ${err}` })
    })
}

// Create new race_result
exports.race_resultsCreate = async (req, res) => {
  // Add new race_result to database
  knex('race_results')
    .insert({ // insert new record, a race_result
      'surname': req.body.surname,
      'firstname': req.body.firstname,
      'grading': req.body.grading,
      'age': req.body.age
      //'rating': req.body.rating
    })
    .then(() => {
      // Send a success message in response
      res.json({ message: `race_result \'${req.body.firstname} ${req.body.surname}\' created.` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error creating race_result ${req.body.surname} race_result: ${err}` })
    })
}

// Remove specific race_result
exports.race_resultsDelete = async (req, res) => {
  // Find specific race_result in the database and remove it
  knex('race_results')
    .where('id', req.body.id) // find correct record based on id
    .del() // delete the record
    .then(() => {
      // Send a success message in response
      res.json({ message: `race_result ${req.body.id} deleted.` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error deleting ${req.body.id} race_result: ${err}` })
    })
}

// Remove all race_results on the list
exports.race_resultsReset = async (req, res) => {
  // Remove all race_results from database
  if (1) {
    console.log('race_resultsReset blocked for safety');
  }else { // Preventing deletes
    knex
      .select('*') // select all records
      .from('race_results') // from 'race_results' table
      .truncate() // remove the selection
      .then(() => {
        // Send a success message in response
        res.json({ message: 'race_result list cleared.' })
      })
      .catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error resetting race_result list: ${err}.` })
      })
  };
}
