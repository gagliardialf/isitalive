'use strict';

var chai = require('chai'),
    should = chai.should(),
    expect = chai.expect;
var Question = require('../../services/question');

var data = null;
var fakeSession = {
		sessions: [
			{id: '1', currentQuestion: -1}
		],
		update: function (id, qId) {
			return;
		},
		get: function (id) {
			return;
		}
	};
var question = null;

describe('question', function () {
	beforeEach(function () {
		data = {
			people_it: [
				{id: 1, name: "name1", desc: "desc1", isAlive: true}
			]
		};

		question = new Question(data, fakeSession);
	});
	
	describe('new', function () {
		it('should return error if the session is not updated', function (done) {	
			fakeSession.update = function () { return false; }
			question.new('2', function (err, data) {
				err.message.should.be.equal('Error while updating session!');
				(data === null).should.be.true;
				done();
			});
		});

		it('should return a question', function (done) {
			fakeSession.update = function () { return true; }
			question.new('1', function (err, data) {
				(err === null).should.be.true;
				(data.id).should.be.equal(1);
				(data.name).should.be.equal("name1");
				(data.desc).should.be.equal("desc1");
				done();
			});
		});

		it('should select random questions', function (done) {
			var p = [];
			for (var j = 0; j < 1000; j++) {
				p.push({id: j});
			}
			data = {
				people_it: p
			};
			question = new Question(data, fakeSession);
			var ids = [];
			for (var i = 0; i < 3; i++) {
				setTimeout (function () {
					question.new('1', function (err, d) {
						if (ids.indexOf(d.id) == -1) {						
							ids.push(d.id);
						}	
					});
				}, 10);	
			};
			setTimeout (function ()  {
				(ids.length).should.be.equal(3);
				done();
			}, 100);
		});
	});

	describe('answer', function () {
		beforeEach(function () {
			data = {
				people_it: [
					{id: 1, name: "name1", desc: "desc1", isAlive: true},
					{id: 2, name: "name2", desc: "desc2", isAlive: false}
				]
			};

			question = new Question(data, fakeSession);
		});

		it('should return error if the session is not found', function (done) {	
			fakeSession.get = function () { return undefined; }
			question.answer(false, '2', function (err, data) {
				err.message.should.be.equal('Error while retrieving session!');
				(data === null).should.be.true;
				done();
			});
		});

		it('should return error if the question is not found', function (done) {	
			fakeSession.get = function () { return true; }
			question.answer(false, 'notExisting', function (err, data) {
				err.message.should.be.equal('Error while retrieving question!');
				(data === null).should.be.true;
				done();
			});
		});

		[{question: '1', isAlive: true}, {question: '2', isAlive: false}].forEach (function (el) {
			it('should tell if the given question is right --> ' + JSON.stringify(el), function (done) {	
				fakeSession.get = function () { return {currentQuestion: el.question}; };
				question.answer(el.isAlive, el.question, function (err, data) {
					(err === null).should.be.true;
					(data.feedback).should.be.equal(true);
					done();
				});
			});
		});

		[{question: '1', isAlive: false}, {question: '2', isAlive: true}].forEach (function (el) {
			it('should tell if the given question is wrong --> ' + JSON.stringify(el), function (done) {	
				fakeSession.get = function () { return {currentQuestion: el.question}; };
				question.answer(el.isAlive, el.question, function (err, data) {
					(err === null).should.be.true;
					(data.feedback).should.be.equal(false);
					done();
				});
			});
		});
	});
});