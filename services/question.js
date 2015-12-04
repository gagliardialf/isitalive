var _ = require('lodash');

module.exports = function (data, session) {
	this.new = function (sId, cb) {
		var err = null;
		var question = null;
		var questionIndex = Math.floor(Math.random() * data.people_it.length);
		
		if (session.update(sId, questionIndex)) {
			question = {
				id: data.people_it[questionIndex].id,
				name: data.people_it[questionIndex].name,
				desc: data.people_it[questionIndex].desc
			};
		} else {
			err = new Error('Error while updating session!');
		}
		if (typeof (cb) === 'function') {
			cb(err, question);
		}
	};

	this.answer = function (isAlive, id, cb) {
		var err = null;
		var resp = null;
		var s = session.find(id);
		if (s == undefined) {
			err = new Error('Error while retrieving session!');
		} else {
			var question = _.find(data.people_it, function (el) {
				return el.id == id;
			});
			if (question == undefined) {
				err = new Error('Error while retrieving question!');
			} else {
				resp = {
					feedback: isAlive === question.isAlive
				};
			}
		}
		if (typeof (cb) === 'function') {
			cb(err, resp);
		}
	}
};