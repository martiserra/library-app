/**
 * Controller for libraries routes
 */

var  Library = require('../models/library.js');

exports.get = function(id, callback){
  Library.findOne({code: id}, function(error, library) {
    if (error) {
      console.log('Error loading library' + id + ' -- ' + error);
      callback(null);
    } else {
      if (library != null) {
        var libraryPresenter = {
          code: library.code,
          name: library.name,
          places: library.places,
          occupancy: 0.83 
        }
        callback(libraryPresenter); 
      } else {
        callback(null);
      }
        
    }
   
  })
};

exports.post = function(code, name, places) {
    new Library({code: code, name: name, places: places}).save();
}