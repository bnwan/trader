var AmpersandView = require('ampersand-view');
var AmpersandState = require('ampersand-state');
var ViewSwitcher = require('ampersand-view-switcher');

var template = require('./spot-tile-controller-template.hbs');

var SpotTileView = require('./spottile/spot-tile-view');
var AffirmationView = require('./spottile/views/affirmation-view');
var ErrorView = require('./spottile/views/error-view');
var ErrorModel = require('./error-model');

var appEvents = require('../app-events');

var Controller = AmpersandView.extend({
	name: 'spot-tile-controller',
	template: template,

	initialize: function () {
		this.on('execute:trade:failed', this.executeTradeFailed);
		this.on('execute:trade:completed', this.executeTradeCompleted);
	},

	render: function () {
		this.renderWithTemplate(this);

		this.switcherContainer = this.query('.normal-tile');
		this.switcher = new ViewSwitcher(this.switcherContainer);
		this.switchToSpotTileView();

		return this;
	},

	switchToSpotTileView: function () {
		var spotTileView = new SpotTileView({
			model: this.model
		});
		this.listenTo(spotTileView, 'execute', this.executeTrade, this);

		this.switcher.set(spotTileView);
	},

	switchToAffirmationView: function () {
		var affirmationView = new AffirmationView({
			model: this.model
		});

		this.listenTo(affirmationView, 'dismiss', this.switchToSpotTileView, this);
		this.switcher.set(affirmationView);
	},

	switchToErrorView: function (err) {
		var errorView = new ErrorView({
			model: new ErrorModel({
				error: err
			})
		});
		
		this.listenTo(errorView, 'dismiss', this.switchToSpotTileView, this);
		this.switcher.set(errorView);
	},

	executeTrade: function (model) {
		this.model.isExecuting = true;
		appEvents.trigger('execute:trade', model, this);
	},

	executeTradeFailed: function (err) {
		this.model.isExecuting = false;
		this.switchToErrorView(err);
	},

	executeTradeCompleted: function () {
		this.model.isExecuting = false;
		this.switchToAffirmationView();
	}
});

module.exports = Controller;