'use strict';

require('./spotTile.scss');

var AmpersandView = require('ampersand-view');
var template = require('./spot-tile-view-template.hbs');
var OneWayPriceView = require('./views/one-way-price-view');
var simulator = require('simulator');

var View = AmpersandView.extend({	
	template: template,	
	bindings: {
		'model.tileState': {
			type: 'toggle',
			hook: 'state'
		},
		'model.symbol': {
			hook: 'symbol'
		},
		'model.isExecuting': {
			type: 'toggle',
			hook: 'isExecuting'
		},
		'model.stale': {
			type: 'toggle',
			hook: 'stale'			
		},
		'model.notStale': {
			type: 'toggle',
			hook: 'notStale'			
		},
		'model.upMovement': {
			type: 'toggle',
			hook: 'up-movement'
		},
		'model.downMovement': {
			type: 'toggle',
			hook: 'down-movement'
		},
		'model.spread': {
			hook: 'spread'
		},
		'model.dealtCurrency': {
			hook: 'dealtCurrency'
		},
		'model.notional': {
			type: 'value',
			hook: 'notional'
		},
		'model.spotDate': {
			hook: 'spotDate'
		}
	},

	subviews: {
		bid: {
			container: '[data-hook=one-way-price-bid]',
			waitFor: 'model.bidPriceModel',
			prepareView: function(el){
				this.subviews.bid.view = new OneWayPriceView({
					el: el,
					model: this.model.bidPriceModel
				});
				return this.subviews.bid.view;
			}
		},

		ask: {
			container: '[data-hook=one-way-price-ask]',
			waitFor: 'model.askPriceModel',			
			prepareView: function(el){
				this.subviews.ask.view = new OneWayPriceView({
					el: el,
					model: this.model.askPriceModel
				});
				return this.subviews.ask.view;
			}
		}
	},

	initialize: function(){
		var self = this;
		simulator.prices(this.model.ccyPair).subscribe(function(price) {			

			self.model.price.set({
				bid: price.bid.rate,
				ask: price.ask.rate,
				ccyPair: price.ccyPair,				
				valueDate: price.valueDate,
				spread: price.spread,
				mid: price.mid
			});

			self.model.trigger('change:price', self.model);

			self.model.askPriceModel.set({
				type: 'ask',
				direction: self.model.direction,
				ccyPair: price.ccyPair,	
				rate: price.ask.rate
			});

			self.model.bidPriceModel.set({
				type: 'bid',
				direction: self.model.direction,
				ccyPair: price.ccyPair,	
				rate: price.bid.rate
			});			

	  });
	},
	
	render: function(){
		this.renderWithTemplate(this);
		
		this.listenTo(this.subviews.ask.view, 'execute', this.execute);
		this.listenTo(this.subviews.bid.view, 'execute', this.execute);
		
		return this;
	},
	
	execute: function(model){				
		this.trigger('execute', model, this);
	}
});

module.exports = View;