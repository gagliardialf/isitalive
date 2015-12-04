'use strict';

var _ = require('lodash'),
	chai = require('chai'),
    should = chai.should(),
    expect = chai.expect;
var Session = require('../../services/session');

var session = null;

describe('session', function () {
	beforeEach(function () {
		session = new Session();
	});

	describe('start', function () {		
		it('should start a game session initializing the session object', function () {
			var started = session.start('1');
			var i = _.findIndex(session.sessions, function (el) {
				return el.id === "1";
			});
			started.should.be.true;
			i.should.be.equal(0);
		});

		it('should not start a session if the id parameter is not passed', function () {
			var started = session.start();			
			started.should.be.false;
			session.sessions.length.should.be.equal(0);
		});

		it('should not start a session twice (with the same id)', function () {
			var s1 = session.start('1');
			var s2 = session.start('1');
			s2.should.be.false;
			session.sessions.length.should.be.equal(1);
		});	
	});

	describe('stop', function () {
		beforeEach(function () {			
			session.sessions.push({ id: '1'});
		});

		it('should stop a game session', function () {
			var stopped = session.stop('1');
			stopped.should.be.true;
			session.sessions.length.should.be.equal(0);
		});

		it('should not stop a session if the id parameter is not passed', function () {
			var stopped = session.stop();			
			stopped.should.be.false;
			session.sessions.length.should.be.equal(1);
		});

		it('should return error if the id does not exist', function () {
			var stopped = session.stop('2');
			stopped.should.be.false;
			session.sessions.length.should.be.equal(1);
		});
	});

	describe('get', function () {
		it('should get an existing session', function () {
			session.start('1');
			var s = session.get('1');
			s.id.should.be.equal('1');
			s.currentQuestion.should.be.equal(-1);
		});

		it('should return <undefined> if the session does not exist', function () {
			var s = session.get('1');
			(s === undefined).should.be.true;
		});
	});

	describe('update', function () {
		it('should update an existing session', function () {
			session.start('1');
			(session.update('1', 123)).should.be.true;
			var s = session.get('1');
			s.id.should.be.equal('1');
			s.currentQuestion.should.be.equal(123);
		});

		it('should return <false> if the session does not exist', function () {
			(session.update('unexisting', 123)).should.be.false;
		});
	})
});