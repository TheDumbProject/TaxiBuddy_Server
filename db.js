const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'blackdronzer',
  password: 'jithumone',
  host: 'localhost',
  port: 5432, // default Postgres port
  database: 'taxi_buddy',
});

module.exports = pool;
