module.exports = {
	executeTrade: function executeTrade (model, callback){
		
		console.log('execute trade: ', model);
		var err = null;
		setTimeout(function(){
			return callback(err, model);
		}, 500);		
	}
};