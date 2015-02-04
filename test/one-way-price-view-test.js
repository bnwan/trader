var test = require('tape');
var OneWayPriceView = require('../src/spottiles/spottile/views/one-way-price-view');
var OneWayPriceModel = require('../src/spottiles/models/one-way-price-model');
var CurrencyPairModel = require('../src/spottiles/models/currency-pair-model');

//var currenyPairModel = new CurrencyPairModel({
//	
//});

var a = 1;

test('basics', function (t) {
	
	t.equal(a, 1);
	
	t.end();
});