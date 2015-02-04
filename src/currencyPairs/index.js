'use strict';

var Rx = require('rx');

var createCurrencyPair = function (symbol, pipsPosition, ratePrecision) {
  return {
    symbol: symbol,
    pipsPosition: pipsPosition,
    ratePrecision: ratePrecision,
    baseCurrency: symbol.substring(0, 3),
    counterCurrency: symbol.substring(3, 3)
  };
};

var currencyPairs = [
  createCurrencyPair('EURUSD', 4, 5),
  createCurrencyPair('USDJPY', 2, 3),
  createCurrencyPair('GBPUSD', 4, 5),
  createCurrencyPair('GBPJPY', 2, 3),
  createCurrencyPair('EURJPY', 2, 3),
  createCurrencyPair('AUDUSD', 4, 5),
  createCurrencyPair('NZDUSD', 4, 5),
  createCurrencyPair('USDCAD', 4, 5),
  createCurrencyPair('EURCAD', 4, 5),
  createCurrencyPair('EURAUD', 4, 5)
];

module.exports = function() {
  return Rx.Observable.returnValue(currencyPairs);
};
