'use strict';

module.exports = function(app, basedir) {
  var libraries = require('../app/controllers/libraries');
  //var index = require('../app/controllers/index');
    
  //app.get('/libraries', libraries.list);
  app.get('/libraries/:id', function(req, res) {
    var library = libraries.get(req.params.id);
    res.json(JSON.stringify(library));
  });

  app.get('/', function(req, res) {
    res.sendfile(basedir + '/app/views/index.html');
  });

  //});

};



