var State = require('ampersand-state');

var ErrorModel = State.extend({
	props: {
		error: 'object'
	},
	derived: {
		message: {
			deps: ['error'],
			fn: function(){
				return this.error.message;
			}
		}
	}
});

module.exports = ErrorModel;