module.exports = function (data) {
	this.new = function () {
		return {
			id: data.people_it[0].id,
			name: data.people_it[0].name,
			desc: data.people_it[0].desc
		};
	};
};