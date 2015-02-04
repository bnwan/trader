'use strict';

var AmpersandState = require('ampersand-state');

var Model = AmpersandState.extend({
  props: {
		type: {
			type: 'string',
			value: ['bid', 'ask']
		},
    ccyPair: 'state',
    direction: 'string',
    rate: {
      type: 'number',
      default: 0
    }
  },
  derived: {
    rateAsString: {
      deps: ['rate', 'ccyPair'],
      fn: function() {
        return this.rate.toFixed(this.ccyPair.ratePrecision);
      }
    },
    pips: {
      deps: ['ccyPair', 'rateAsString'],
      fn: function() {
        var dotIndex = this.rateAsString.indexOf('.');
        return this.rateAsString.substring(dotIndex + this.ccyPair.pipsPosition - 1, dotIndex + this.ccyPair.pipsPosition + 1);
      }
    },
    bigFigures: {
      deps: ['rateAsString', 'ccyPair'],
      fn: function() {
        var dotIndex = this.rateAsString.indexOf('.');
        return this.rateAsString.substring(0, dotIndex + this.ccyPair.pipsPosition - 1);
      }
    },
    tenthOfPips: {
      deps: ['rateAsString', 'ccyPair'],
      default: '',
      fn: function() {
      	var dotIndex = this.rateAsString.indexOf('.');
        if (this.ccyPair.ratePrecision > this.ccyPair.pipsPosition) {
          return this.rateAsString.substring(dotIndex + this.ccyPair.pipsPosition + 1, this.rateAsString.length);
        }
      }
    }
  }
});

module.exports = Model;