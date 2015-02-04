'use strict';

var AmpersandState = require('ampersand-state');

var PriceModel = AmpersandState.extend({
  props: {
    bid: 'number',
    ask: 'number',
    valueDate: 'number',
    ccyPair: 'state',
    spread: {
      type: 'number',
      default: function(){
        return 0;
      }
    },
    mid: {
      type: 'number',
      default: function(){
        return 0;
      }
    }
  }
});

module.exports = PriceModel;