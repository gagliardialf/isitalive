"use strict"

var express = require('express');
var http = require('http');
var path = require('path');

var Question = require('./services/question');
var Session = require('./services/session');
var data = require('./data/people_it');

var session = new Session();
var question = new Question(data, session);
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));

/*
 * SESSION MANAGEMENT API
 * /start: start a new game session for a given id
 * /stop: stop the session for the given id
 */
app.get('/start', function (req, res) {
	res.status(200).send(session.start(req.query.id));
});
app.get('/stop', function (req, res) {
	res.status(200).send(session.stop(req.query.id));
});

/*
 * QUESTIONS API
 * /new: sets a new question for the given id
 * /dead: answers 'is dead' for the question linked to the given id
 * /alive: answers 'is dead' for the question linked to the given id
 */
app.get('/new', function (req, res) {
	question.new(req.query.id, function (err, data) {
		res.status(200).send(data);
	});
});

app.get('/dead', function (req, res) {
	question.answer(false, req.query.id, function (err, data) {
		res.status(200).send(data);
	});
});

app.get('/alive', function (req, res) {
	question.answer(true, req.query.id, function (err, data) {
		res.status(200).send(data);
	});
});

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;