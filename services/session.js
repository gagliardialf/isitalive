var _ = require('lodash');

module.exports = function () {
	this.sessions = [];

	this.get = function (id) {
		if (id === undefined) {
			return undefined;
		};
		var s = _.find(this.sessions, function (el) {
			return el.id === id;
		});
		return s;
	};

	this.start = function (id) {
		if (id === undefined) {
			return false;
		};
		var i = _.findIndex(this.sessions, function (el) {
			return el.id === id;
		});
		if (i > -1) {
			return false;
		}
		this.sessions.push({id: id, currentQuestion: -1});
		return true;
	};

	this.stop = function (id) {
		if (this.get(id) == undefined) {
			return false;
		};
		
		var i = _.findIndex(this.sessions, function (el) {
			return el.id === id;
		});
		
		this.sessions.splice(i, 1);
		return true;
	};	

	this.update = function (id, question) {
		var s = this.get(id);
		if (s == undefined) {
			return false;
		};
		s.currentQuestion = question;
		return true;
	}
}