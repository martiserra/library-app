/**
 * Controller for libraries routes
 */

var libraries = [
{"id":1, "name":"Ciències Socials UAB", "places":220, "occupancy":0.85}
];


exports.get = function(id){
  for (var i=0; i < libraries.length; i++) {
    if (libraries[i].id == id) return libraries[i];
  }
};exports.post = function(code, name, places) {
    new Library({code: code, name: name, places: places}).save();
}