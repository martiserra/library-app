/**
 * Controller for libraries routes
 */

var Library = require('../models/library.js');
var LibraryActivity = require('../models/libraryActivity.js');
var OccupancyHelper = require('../helpers/OccupancyHelper.js');

exports.get = function(req, res) {
  var id = req.params.id;

  Library.findOne({code: id}, function(error, library) {
    
    if (error || library == null) {
      console.log('Error loading library' + id + ' -- ' + error);
      res.send('Not Found', 404);

    } else {
      var now = new Date();
      var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      LibraryActivity.find({library: library._id, date: {"$gte": today}}).sort({date: 'desc'}).exec(function(error, activities) {
        if (error || activities == null) {
          console.log('ADMIN -- Error loading activities for library:' + id + ' -- ' + error);
          res.send('Not Found', 404);
        } else {
          var occupancy = OccupancyHelper.getOccupancy(activities);
          var percentage = occupancy / library.places;
          var lastUpdate = OccupancyHelper.getLastUpdate(activities[0]);

          var libraryPresenter = {
            code: library.code,
            name: library.name,
            places: library.places,
            occupancy: percentage,
            lastUpdate : lastUpdate
          }

          res.json(JSON.stringify(libraryPresenter));
        }
        
      });
    }
  });  
};