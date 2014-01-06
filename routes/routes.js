'use strict';

module.exports = function(app, basedir) {
  var libraries = require('../app/controllers/libraries');
  //var index = require('../app/controllers/index');
    
  app.get('/libraries', libraries.list);
  
  //app.get('/', index.render);
  app.get('/', function(req, res) {
    res.sendfile(basedir + '/app/views/index.html');
  });

  //app.get('*', function(req, res){
  //  res.send('URL Not Found', 404);
  //});

};



