'use strict';

var chai = require('chai'),
    should = chai.should(),
    expect = chai.expect;
var Question = require('../../services/question');

var question = null;

describe('question', function () {
	beforeEach(function () {
		var data = {
			people_it: [
				{id: 1, name: "name", desc: "desc", isAlive: true}
			]
		};
		question = new Question(data);
	});
	
	describe('new', function () {
		it('should return a question', function () {
			var q = question.new();
			(q.id).should.be.equal(1);
			(q.name).should.be.equal("name");
			(q.desc).should.be.equal("desc");
		});
	});
});