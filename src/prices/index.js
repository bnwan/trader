'use strict';

var Rx = require('rx');

var priceFactory = function(ccyPair, bid, ask, valueDate) {
  return {
    bid: {
      rate: bid
    },
    ask: {
      rate: ask
    },
    spread: (ask - bid) * Math.pow(10, ccyPair.pipsPosition),
    valueDate: valueDate,
    ccyPair: ccyPair,
    mid: (bid + ask) / 2
  };
};

var sampleRates = {
  'EURUSD': 1.3629,
  'USDJPY': 102.14,
  'GBPUSD': 1.6395,
  'GBPJPY': 167.67,
  'EURJPY': 139.22,
  'AUDUSD': 0.8925,
  'NZDUSD': 0.8263,
  'USDCAD': 1.1043,
  'EURCAD': 1.5062,
  'EURAUD': 1.5256
};

var generateNewQuote = function(previousPrice) {
  var halfSpread = Math.round(Math.random() * 10);
  var pow = Math.pow(10, previousPrice.ccyPair.ratePrecision);
  var newMid = previousPrice.mid + (Math.random() - 0.5) / pow;
  var sampleRate = sampleRates[previousPrice.ccyPair.symbol];

  // check that the new mid does not drift too far from sampleRate (10%)
  if (Math.abs(newMid - sampleRate) / sampleRate > 0.1) {
    newMid = sampleRate;
  }

  var price = priceFactory(
    previousPrice.ccyPair,
    newMid - halfSpread / pow,
    newMid + halfSpread / pow,
    Date.now() + 2 * 24 * 60 * 60 * 1000,
    newMid);

  return price;
};

module.exports = function(ccyPair) {
  var initialPrice = priceFactory(ccyPair, 0, 0, 0);

  return Rx.Observable
    .return(0)
    .concat(
      Rx.Observable.timer(200, 200, Rx.Scheduler.timeout)
      .where(function() {
        return Math.random() > 0.8;
      }) // 1 chance out of 5 to tick, 1 tick per second in average
    )
    .scan(initialPrice, function(previousValue) {
      return generateNewQuote(previousValue);
    })
    .select(function(price) {
      return priceFactory(ccyPair, price.bid.rate, price.ask.rate, price.valueDate);
    });
};
