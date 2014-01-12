/**
 * Controller for admin routes
 */

var Library = require('../models/library.js');

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
    var library = {
      code: 0,
      name: "",
      university: "",
      location: "",
      places: 0
    };
    res.render('library_add', { library: library });
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