'use strict';

module.exports = function(app) {
  var libraries = require('../controllers/libraries');
  var index = require('../controllers/index');
    
  app.get('/libraries', libraries.list);
  app.get('/', index.render);

};



