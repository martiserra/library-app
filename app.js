
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

app.use(express.static(__dirname + '/components'));
app.use(express.static(__dirname + '/public'));

// Connect to MongoDB when the app initializes
mongoose.connect('mongodb://localhost/librariesapp');

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//Bootstrap routes
require('./routes/routes')(app, __dirname);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
