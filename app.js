const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV !== 'production') {
    require('dotenv').load();
}

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup a default catch-all route that sends back a welcome message in JSON format.
require('./server/routes')(app);
app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to DocHut.',
}));

module.exports = app;