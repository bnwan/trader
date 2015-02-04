'use strict';

var AmpersandState = require('ampersand-state');
var OneWayPriceModel = require('./one-way-price-model');
var PriceModel = require('../../prices/price-model');
var CurrencyPairModel = require('./currency-pair-model');
var priceMovement = require('../../helpers/price-movement');
var tileState = require('../../helpers/tile-state');

var ccyPair = new CurrencyPairModel();

var Model = AmpersandState.extend({
  props: {    
		tradeId: 'string',
    ccyPair: {
      type: 'state',
      default: function(){
        return new CurrencyPairModel();
      }
    },
    notional: {
      type: 'string',
      default: function() {
        return '1,000,000';
      }
    },
    price: {
      type: 'state',
      default: function(){
        return new PriceModel();
      }
    },    
    askPriceModel: {
      type: 'state',
      default: function(){
        return new OneWayPriceModel({
          ccyPair: ccyPair
        });
      }
    },
    bidPriceModel: {
      type: 'state',
      default: function(){
        return new OneWayPriceModel({
          ccyPair: ccyPair
        });
      }
    }
  },    
  derived: {
    movement: {
      deps: ['price', 'previousRate'],
      default: function() {
        return priceMovement.None;
      },
      fn: function(){
        if(this.price){
          if (this.price.mid > this.previousRate) {
            this.previousRate = this.price.mid;
            return priceMovement.Up;
          } else if (this.price.mid < this.previousRate) {
            this.previousRate = this.price.mid;
            return priceMovement.Down;
          } else {
            this.previousRate = this.price.mid;
            return priceMovement.None;
          }
        } else {
          return priceMovement.None;
        }
      }
    },
    symbol: {
      deps: ['ccyPair'],
      fn: function() {
        return this.ccyPair.symbol;
      }
    },
    dealtCurrency: {
      deps: ['ccyPair'],
      fn: function() {
        return this.ccyPair.baseCurrency;
      }
    },    
    spotDate: {
      deps: ['price.valueDate'],
      fn: function() {
        return 'SP. ' + new Date(this.price.valueDate).toDateString();
      }
    },
    spread: {
      deps: ['price.spread'],
      fn: function() {
        return this.price.spread.toFixed(1);
      }
    },
    upMovement: {
      deps: ['movement'],
      fn: function(){
        return this.movement === 2;
      }
    },
    downMovement: {
      deps: ['movement'],
      fn: function(){
        return this.movement === 1;
      }
    },
    tileState: {
      deps: ['state'],
      fn: function(){
        return this.state === 0;
      }
    },
    notStale: {
      deps: ['stale'],
      fn: function(){
        return !this.stale;
      }
    }
  },
  session: {  
    previousRate: 'number',
    stale: {
      type: 'boolean',
      default: function() {
        return false;
      }
    },
    isExecuting: {
      type: 'boolean',
      default: function() {
        return false;
      }
    },
    state: {
      type: 'number',
      default: function() {
        return tileState.Pricing;
      }
    }
  }
});

module.exports = Model;