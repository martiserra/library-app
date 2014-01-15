var mongoose = require('mongoose')
  ,Schema = mongoose.Schema;
 
var commentSchema = new Schema({
  email: String,
  comment: String,
  date: Date
});
 
module.exports = mongoose.model('Comment', commentSchema);