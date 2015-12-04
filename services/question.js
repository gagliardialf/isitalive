module.exports = function (data, session) {
	this.new = function () {
		var index = Math.floor(Math.random() * data.people_it.length);
		return {
			id: data.people_it[index].id,
			name: data.people_it[index].name,
			desc: data.people_it[index].desc
		};
	};
};