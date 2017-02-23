{
  'use strict';

  const mongoose = require('mongoose'),
        connection = mongoose.connect('mongodb://localhost/test', function(err) {
          if (err) {
            console.log(err.message);
            process.exit();
          }
        });
   
  module.exports = connection;
}