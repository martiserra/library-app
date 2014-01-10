/**
 * Controller for libraries routes
 */

var  Library = require('../models/library.js');

exports.get = function(req, res) {
  var id = req.params.id;

  Library.findOne({code: id}, function(error, library) {
    
    if (error || library == null) {
      console.log('Error loading library' + id + ' -- ' + error);
      res.send('Not Found', 404);

    } else {
      var libraryPresenter = {
        code: library.code,
        name: library.name,
        places: library.places,
        occupancy: 0.83 
      }
      res.json(JSON.stringify(libraryPresenter));
    }
  });  
};