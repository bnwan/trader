require('chai').should();

var OneWayPriceModel = require('../src/spottiles/models/one-way-price-model');
var CurrencyPairModel = require('../src/spottiles/models/currency-pair-model');

describe('one-way-price-model', function(){
	
	var currencyPairModel = new CurrencyPairModel({
		symbol: 'EURUSD',
		ratePrecision: 4,
		pipsPosition: 5,
    baseCurrency: 'EUR',
    counterCurrency: 'USD'
	});
	
	var oneWayPriceModel = new OneWayPriceModel({
		ccyPair: currencyPairModel,
		type: 'bid',
		direction: 'Buy'
	});	
	
	it('should have correct property types', function(){
		oneWayPriceModel.ccyPair.should.be.a('object');
		oneWayPriceModel.type.should.be.a('string');
		oneWayPriceModel.direction.should.be.a('string');
	});
	
	it('rate should be equal to zero', function(){		
		oneWayPriceModel.rate.should.equal(0);
	});
});