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
			var data = {
				people_it: [
					{id: 1, name: "name", desc: "desc", isAlive: true}
				]
			};
			question = new Question(data);
			var q = question.new();
			(q.id).should.be.equal(1);
			(q.name).should.be.equal("name");
			(q.desc).should.be.equal("desc");
		});
		it('should select random questions', function (done) {
			var p = [];
			for (var j = 0; j < 1000; j++) {
				p.push({id: j});
			}
			var data = {
				people_it: p
			};
			question = new Question(data);
			var ids = [];
			for (var i = 0; i < 3; i++) {
				setTimeout (function () {
					var q = question.new();
					if (ids.indexOf(q.id) == -1) {						
						ids.push(q.id);
					}
				}, 10);	
			};
			setTimeout (function ()  {
				(ids.length).should.be.equal(3);
				done();
			}, 100);
		});
	});
});