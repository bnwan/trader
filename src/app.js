'use strict';

var domready = require('domready');

var SpotTilesCollection = require('./spotTiles/models/spot-tiles-collection');
var SpotTilesView = require('./spotTiles/spot-tiles-view');

var CcyPairModel = require('./spotTiles/models/currency-pair-model');
var SpotTileModel = require('./spotTiles/models/tile-view-model');

var simulator = require('simulator');

var appEvents = require('./app-events');
var executeionService = require('./execution-service');

domready(function(){

	var spotTilesCollection = new SpotTilesCollection();

	simulator.currencyPairs().subscribe(function(ccyPairs){
		ccyPairs.forEach(function(ccyPair){				

			var spotTileModel = new SpotTileModel({
				ccyPair: new CcyPairModel(ccyPair)
			});

			spotTilesCollection.add(spotTileModel);
		});
	});

	var spotTilesView = new SpotTilesView({
		collection: spotTilesCollection,
		el: document.getElementById('tile-content')
	});
 
	spotTilesView.render();
	
	appEvents.on('execute:trade', function(model, view){
		executeionService.executeTrade(model, function(err, model){
			if(err){
				return view.trigger('execute:trade:failed', err);
			}
			
			return view.trigger('execute:trade:completed');
		});
	});
});
