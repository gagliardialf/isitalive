"use strict"

var express = require('express');
var http = require('http');
var path = require('path');

var Question = require('./services/question');
var data = require('./data/people_it');

var question = new Question(data);
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/new', function (req, res) {
	res.send(200, question.new());
});

app.all('/start', function (req, res) {
	res.send(200, 'started');
});
app.all('/stop', function (req, res) {
	res.send(200, 'stopped');
});
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;