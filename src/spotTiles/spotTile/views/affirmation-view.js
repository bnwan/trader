'use strict';

var AmpersandView = require('ampersand-view');
var template = require('../templates/affirmation.hbs');

var View = AmpersandView.extend({
  template: template,
  binding: {
    'model.currencyPair': '[data-hook=currencyPair]',
    'model.direction': '[data-hook=direction]',
    'model.dealtCurrency': '[data-hook=dealtCurrency]',
    'model.notional': '[data-hook=notional]',
    'model.otherCurrency': '[data-hook=otherCurrency]',
    'model.spotRate': '[data-hook=spotRate]',
    'model.valueDate': '[data-hook=valueDate]',
    'model.tradeId': '[data-hook=tradeId]'
  },
  events: {
  	'click [data-hook=dismiss]': 'dismiss'
  },

  dismiss: function(){
  	this.trigger('dismiss', this);
  }
});

module.exports = View;
