'use strict';

module.exports = function(app, basedir, express) {
  var libraries = require('../app/controllers/libraries');
  var auth = express.basicAuth('clara', 'cmg000');

  // App routes
  app.get('/libraries/:id', libraries.get);

  app.get('/', function(req, res) {
    res.sendfile(basedir + '/public/html/index.html');
  });

  // Admin routes
  app.get('/admin', auth, function(req, res) {
    res.render('index');
  });

  app.post('/libraries', function(req, res) {
    libraries.post(req.body.code, req.body.name, req.body.places)
  });

};



