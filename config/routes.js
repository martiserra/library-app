'use strict';

module.exports = function(app, basedir) {
  var libraries = require('../app/controllers/libraries');

  app.get('/libraries/:id', libraries.get);

  app.get('/', function(req, res) {
    res.sendfile(basedir + '/app/views/index.html');
  });

  app.post('/libraries', function(req, res) {
    libraries.post(req.body.code, req.body.name, req.body.places)
  });

};



