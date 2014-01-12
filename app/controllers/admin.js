/**
 * Controller for admin routes
 */

var Library = require('../models/library.js');
var LibraryActivity = require('../models/libraryActivity.js');

exports.list = (function(req, res) {
  Library.find(function(error, libraries) {
    res.render('index', {libraries: libraries});
  });  
});

exports.getLibrary = (function(req, res) {
  var id = req.params.id;
  Library.findOne({code: id}, function(error, library) {
    if (error || library == null) {
      console.log('ADMIN -- Error loading library' + id + ' -- ' + error);
      res.send('Not Found', 404);
    } else {
      res.render('library_show', {library: library});
    }
  });  
});

exports.getNewLibrary = (function(req, res) {
    res.render('library_add');
});

exports.postNewLibrary = (function(req, res) {
  var library;

  library = new Library({
    code: req.body.code,
    name: req.body.name,
    university: req.body.university,
    location: req.body.location,
    places: req.body.places
  });
  
  library.save(function (err) {
    if (!err) {
      return console.log("created");
    } else {
      return console.log(err);
    }
  });

  res.redirect('/admin/', 301);
});

exports.deleteLibrary = (function(req, res) {
  var id = req.params.id;
  Library.findOne({code: id}, function(error, library) {
    if (error || library == null) {
      console.log('ADMIN -- Error loading library' + id + ' -- ' + error);
      res.send('Not Found', 404);
    } else {
      library.remove(function (err) {
        if (!err) {
          return console.log("created");
        } else {
          return console.log(err);
        }
      });
      res.redirect('/admin/', 301);
    }
  });
}); 

exports.addActivity = (function(req, res) {
  var id = req.params.id;
  Library.findOne({code: id}, function(error, library) {

    if (error || library == null) {
      console.log('ADMIN -- Error loading library' + id + ' -- ' + error);
      res.send('Not Found', 404);
    } else {
      var libraryActivity;

      libraryActivity = new LibraryActivity({
        library: library._id,
        date: Date.now,
        inbound: req.body.inbound,
        outbound: req.body.outbound
      });

      libraryActivity.save(function(error) {
        if (!error) {
          return console.log("LibraryActivity created");
        } else {
          return console.log(error);
        }
      });
        res.redirect('/admin/libraries/' + id, 301);
    }
  });

});

