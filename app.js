
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

// templating engine for admin tool
var hbs = require('hbs');
app.set('view engine', 'html');
app.set('views', './admin/views');
app.engine('html', hbs.__express);

// static content
app.use(express.static(__dirname + '/components'));
app.use(express.static(__dirname + '/public'));

var config = require('./config/config');

// Connect to MongoDB when the app initializes
mongoose.connect(config.db());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Bootstrap routes
require('./config/routes')(app, __dirname, express);

// Server Creation
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
