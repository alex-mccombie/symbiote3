// Import path module
const path = require('path')

// Get the location of database.sqlite file
const dbPath = path.resolve(__dirname, 'db/database2.sqlite')

// Create connection to SQLite database
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true
})

/*
if (0) {
  // Create a table in the database called "races"
  knex.schema
    // Make sure no "races" table exists
    // before trying to create new
    .hasTable('races')
    .then((exists) => {
      if (!exists) {
        // If no "races" table exists
        // create new, with "id", "author", "title",
        // "pubDate" and "rating" columns
        // and use "id" as a primary identification
        // and increment "id" with every new record (race)
        return knex.schema.createTable('races', (table) => {
          table.increments('id').primary()
          table.string('author')
          table.string('title')
          table.string('pubDate')
          table.integer('rating')
        })
          .then(() => {
            // Log success message
            console.log('Table \'Races\' created')
          })
          .catch((error) => {
            console.error(`There was an error creating table: ${error}`)
          })
      }
    })
    .then(() => {
      // Log success message
      console.log('done')
    })
    .catch((error) => {
      console.error(`There was an error setting up the database: ${error}`)
    })
};
*/

// Just for debugging purposes:
// Log all data in "clubs" table
//let CheckTable = 'race_results';
if (0) {
  let CheckTable = 'riders';
  knex.select('*').from(CheckTable)
    .then(data => console.log('db.js setup ' + CheckTable + ' data:', data))
    .catch(err => console.log(err));
};

// Export the database
module.exports = knex
