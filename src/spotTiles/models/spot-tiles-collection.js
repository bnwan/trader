'use strict';

var AmpersandCollection = require('ampersand-collection');
var SpotTileModel = require('./tile-view-model');

var SpotTilesCollection = AmpersandCollection.extend({
	model: SpotTileModel
});

module.exports = SpotTilesCollection;