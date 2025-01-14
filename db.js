const Pool = require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
  user: 'blackdronzer',
  password: 'jithumone',
  host: 'localhost',
  port: 5432, // default Postgres port
  database: 'taxi_buddy',
});

// const pool = new Pool({
//   connectionString: process.env.CONNECTION_STRING,
// });

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error executing query', err.stack);
  } else {
    console.log('Connected to Supabase:', res.rows);
  }
});

module.exports = pool;
