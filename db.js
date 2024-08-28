const Pool = require("pg").Pool;
const pool = new Pool({
  user: "blackdronzer",
  password: "jithumone",
  host: "localhost",
  port: 5432, // default Postgres port
  database: "taxi",
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
