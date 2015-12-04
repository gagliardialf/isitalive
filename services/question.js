module.exports = function (data) {
	this.new = function () {
		var index = Math.floor(Math.random() * data.people_it.length);
		return {
			id: data.people_it[index].id,
			name: data.people_it[index].name,
			desc: data.people_it[index].desc
		};
	};

	this.answer = function (id) {
		if(!id || id.match(/\D/) !== null || isNaN(parseInt(id, 10))) {
			return false;
		}
		return true;
	}
};