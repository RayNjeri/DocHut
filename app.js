const express = require('express');
const logger = require('morgan');
const path = require('path');
const webpack = require('webpack');
const bodyParser = require('body-parser');
const config = require('./webpack.config.dev');
const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV !== 'production') {
  require('dotenv').load();
}

const port = 3000;
// Set up the express app
const app = express();
const compiler = webpack(config);
app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup a default catch-all route that sends back a welcome message in JSON format.
require('./server/routes')(app);

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './client/src/index.html'));
});
// app.get('*', (req, res) => res.status(200).send({
//     message: 'Welcome to DocHut.',
// }));

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server running on http://localhost:${port}`);
  }
});
module.exports = app;
