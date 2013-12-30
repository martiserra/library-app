/**
 * Controller for libraries routes
 */

var libraries = [
{"id":1, "name":"Demo Biblioteca", "places":120, "available":"1/1/2013"},
{"id":2, "name":"Ciències UAB", "places":220, "available":"5/5/2014"},
{"id":3, "name":"More Coming Soon", "places":0, "available":"1/1/2015"},
];

exports.list = function(req, res){
  res.send(libraries);
};