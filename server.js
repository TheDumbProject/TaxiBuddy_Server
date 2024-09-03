const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./src/routes');
const initiatorRoutes = require('./src/InitiatorRoutes');
const checkInitiator = require('./src/middlewares/checkInitiator');
require('dotenv').config();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use('/', routes);

initiatorRoutes.use(checkInitiator);

app.use((req, res) => {
  res.status(404).send('Route not found');
});

app.listen(process.env.PORT, () => {
  console.log(`Running on : http://localhost:${process.env.PORT}`);
});
