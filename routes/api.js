var express = require('express');
var router = express.Router();

var Question = require('../services/question');
var Session = require('../services/session');
var data = require('../data/people_it');

var session = new Session();
var question = new Question(data, session);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(200).send('start - stop - new -dead - alive');
});

/*
 * SESSION MANAGEMENT API
 * /start: start a new game session for a given id
 * /stop: stop the session for the given id
 */
router.get('/start', function (req, res) {
	res.status(200).send(session.start(req.query.id));
});
router.get('/stop', function (req, res) {
	res.status(200).send(session.stop(req.query.id));
});

/*
 * QUESTIONS API
 * /new: sets a new question for the given id
 * /dead: answers 'is dead' for the question linked to the given id
 * /alive: answers 'is dead' for the question linked to the given id
 */
router.get('/new', function (req, res) {
	question.new(req.query.id, function (err, data) {
		res.status(200).send(data);
	});
});

router.get('/dead', function (req, res) {
	question.answer(false, req.query.id, function (err, data) {
		res.status(200).send(data);
	});
});

router.get('/alive', function (req, res) {
	question.answer(true, req.query.id, function (err, data) {
		res.status(200).send(data);
	});
});

module.exports = router;