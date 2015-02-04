'use strict';

var AmpersandState = require('ampersand-state');

var Model = AmpersandState.extend({
	props: {
		symbol: 'string',
		ratePrecision: 'number',
		pipsPosition: 'number',		    
    baseCurrency: 'string',
    counterCurrency: 'string'
	}
});

module.exports = Model;