/**
 * Controller for Comments routes
 */

var Comment = require('../models/comment.js');
var DateHelper = require('../helpers/dateHelper.js');

exports.add = (function(req, res) {
  var date = DateHelper.getLocalizedDate();
  var comment = new Comment({
    email: req.body.email,
    comment: req.body.comment,
    date: date
  });
  
  comment.save(function (err) {
    if (!err) {
      console.log("Comment Created");
      res.json();
    } else {
      console.log(err);
      res.send('Error', 500);
    }
  });
});

