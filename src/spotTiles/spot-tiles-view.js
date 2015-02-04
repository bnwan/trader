'use strict';

require('./spotTiles.scss');

var AmpersandView = require('ampersand-view');

var SpotTileController = require('./spot-tile-controller');

var template = require('./spot-tiles-template.hbs');

var View = AmpersandView.extend({
	template: template,	

	render: function(){
		this.renderWithTemplate(this);

		this.renderCollection(this.collection, SpotTileController);

		return this;
	}	
});

module.exports = View;
