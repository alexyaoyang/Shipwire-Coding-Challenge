{
  'use strict';
  const express = require('express'),
        router = express.Router(),
        path = require("path");
        absPath = path.join(__dirname, "../../app");
   
  // route to handle home page
  router.get('/', (req, res, next) => {
   res.sendFile(absPath + "/app.html");
  });
   
  module.exports = router;
}