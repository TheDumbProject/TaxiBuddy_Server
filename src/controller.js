const db = require("../db");

const getUsers = (req, res) => {
  db.query("SELECT * FROM customers", (error, results) => {
    if (error) throw error;

    res.status(200).json(results);
  });
};
module.exports = {
  getUsers,
};
