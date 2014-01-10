'use strict';

module.exports = function(app, basedir) {
  var libraries = require('../app/controllers/libraries');
  //var index = require('../app/controllers/index');
    
  //app.get('/libraries', libraries.list);
  app.get('/libraries/:id', function(req, res) {
    libraries.get(req.params.id, function(library) {
      if (library != null) {
        res.json(JSON.stringify(library));
      } else {
        res.send('Not Found', 404);
      }
    });
    
  });

  app.get('/', function(req, res) {
    res.sendfile(basedir + '/app/views/index.html');
  });

  app.post('/libraries', function(req, res) {
    libraries.post(req.body.code, req.body.name, req.body.places)
  });

};



