'use strict';

var AmpersandView = require('ampersand-view');
var template = require('../templates/error.hbs');

var View = AmpersandView.extend({
  template: template,
  bindings: {
    'model.message': '[data-hook=message]'
  },
  events: {
    'click [data-hook=dismiss]': 'dismiss'
  },

  dismiss: function() {		
    this.trigger('dismiss', this);
  }
});

module.exports = View;    
