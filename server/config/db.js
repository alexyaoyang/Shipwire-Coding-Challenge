const mongoose = require('mongoose'),
      connection = mongoose.connect('mongodb://localhost/test');
 
module.exports = connection;