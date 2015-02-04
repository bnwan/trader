'use strict';

var Rx = require('rx');
var model = require('./models/currencyPairModel');

var currencyPairs = [
  model('EURUSD', 4, 5),
  model('USDJPY', 2, 3),
  model('GBPUSD', 4, 5),
  model('GBPJPY', 2, 3),
  model('EURJPY', 2, 3),
  model('AUDUSD', 4, 5),
  model('NZDUSD', 4, 5),
  model('USDCAD', 4, 5),
  model('EURCAD', 4, 5),
  model('EURAUD', 4, 5)
];

module.exports = function(){
  return Rx.Observable.returnValue(currencyPairs);
};