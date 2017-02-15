const express = require('express'),
      bodyParser = require('body-parser'),
      path = require('path'),
      webRoutes = require('./server/routes/web'),
      apiRoutes = require('./server/routes/api'),
      connection = require("./server/config/db"),
      port = 3000, // port number for running server
      app = express(),
      dotenv = require('dotenv').config();
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json 
app.use(bodyParser.json());
 
// setting static files location './app' for angular app html and js
app.use(express.static(path.join(__dirname, 'app')));
// setting static files location './node_modules' for libs like angular, bootstrap
app.use(express.static('node_modules'));
 
// configure our routes
app.use('/', webRoutes);
app.use('/api', apiRoutes);

module.exports = app;
if (!module.parent) {
  // starting express server
  app.listen(port, () => {
   console.log("Server is running at : http://localhost:" + port);
  });
}