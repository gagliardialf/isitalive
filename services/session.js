var _ = require('lodash');

module.exports = function () {
	this.sessions = [];

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
		if (id === undefined) {
			return false;
		};
		var i = _.findIndex(this.sessions, function (el) {
			return el.id === id;
		});
		if (i == -1) {
			return false;
		}
		this.sessions.splice(i, 1);
		return true;
	};
}