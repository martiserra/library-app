var mongoose = require('mongoose')
  ,Schema = mongoose.Schema;
 
var librarySchema = new Schema({
  code: Number,
  name: String,
  university: String,
  location: String,
  places: Number
});
 
module.exports = mongoose.model('Library', librarySchema);