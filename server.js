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

app.use("/", routes);

app.listen(process.env.PORT, () => {
  console.log(`Running on : http://localhost:${process.env.PORT}`);
});
