'use strict';

module.exports = function(app, basedir, express) {
  var libraries = require('../app/controllers/libraries');
  var admin = require('../app/controllers/admin');
  var comments = require('../app/controllers/comments')
  var auth = express.basicAuth('clara', 'cmg000');

  // App routes
  app.get('/libraries/:id', libraries.get);

  app.get('/', function(req, res) {
    res.sendfile(basedir + '/public/html/index.html');
  });

  app.post('/comments/add', comments.add);

  // Admin routes
  app.get('/admin', auth, admin.list);


  app.get('/admin/libraries/add', auth, admin.getNewLibrary);
  app.post('/admin/libraries/add', auth, admin.postNewLibrary);
  app.get('/admin/libraries/:id', auth, admin.getLibrary);
  app.get('/admin/libraries/delete/:id', auth, admin.deleteLibrary);

  app.post('/admin/activity/add/:id', auth, admin.addActivity);
  app.get('/admin/activity/delete/:id', auth, admin.deleteActivity);
};



