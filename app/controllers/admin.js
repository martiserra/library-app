/**
 * Controller for libraries routes
 */

var  Library = require('../models/library.js');

exports.list = function(req, res) {

  Library.find(function(error, libraries) {
    res.render('index', {libraries: libraries});
  });  
};