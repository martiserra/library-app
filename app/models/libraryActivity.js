var mongoose = require('mongoose')
  ,Schema = mongoose.Schema
  ,ObjectId = Schema.ObjectId;
 
var libraryActivitySchema = new Schema({
    library: ObjectId,
    date: {type: Date, default: Date.now},
    inbound: {type: Number, default: 0},
    outbound: {type: Number, default: 0}
});
 
module.exports = mongoose.model('LibraryActivity', libraryActivitySchema);