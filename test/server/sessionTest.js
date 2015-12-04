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
	});
});