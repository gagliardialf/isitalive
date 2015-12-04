"use strict"

var express = require('express');
var http = require('http');
var path = require('path');

var Question = require('./services/question');
var Session = require('./services/session');
var data = require('./data/people_it');

var question = new Question(data);
var session = new Session();
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/new', function (req, res) {
	res.status(200).send(question.new());
});

app.get('/start', function (req, res) {
	res.status(200).send(session.start(req.query.id));
});
app.get('/stop', function (req, res) {
	res.status(200).send(session.stop(req.query.id));
});
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;