"use strict"

var express = require('express');
var http = require('http');
var path = require('path');

var routes = require('./routes/index');
var api = require('./routes/api');
var telegram = require('./routes/telegram');

var app = express();

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3002);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api', api);
app.use('/telegram', telegram);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

http.createServer(app).listen(app.get('port') ,app.get('ip'), function () {
    console.log("✔ Express server listening at %s:%d ", app.get('ip'),app.get('port'));
});

module.exports = app;