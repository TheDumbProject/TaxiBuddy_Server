const express = require("express");
const db = require("./db");
const bodyParser = require("body-parser");
const app = express();
const routes = require("./src/routes");
require("dotenv").config();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// app.get("/", async (req, res) => {
//   await db.query("SELECT * FROM customers", (error, results) => {
//     if (error) {
//       throw error;
//     }
//     res.status(200).json(results.rows);
//   });
// });
// app.use("/", routes);

app.get("/", (req, res) => {
  const requestData = {
    method: req.method,
    headers: req.headers,
    body: req.body,
    params: req.params,
    query: req.query,
    path: req.path,
    url: req.url,
  };
  res.json(requestData);
});

app.listen(process.env.PORT, () => {
  console.log(`Running on : http://localhost:${process.env.PORT}`);
});
