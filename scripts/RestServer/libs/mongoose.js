/** Mongoose with NodeJS for MongoDB **/
var mongoose = require('mongoose');

var config = require("./config");
var options = config.get('mongoose:options');
mongoose.connect(config.get('mongoose:uri'), options);

var db = mongoose.connection;

db.on('error', function(err) {
	//log.error("Connection error: ", err.message);
});

db.on('open', function() {
	//log.info("Connected to Mongo");
	mongoose.connection.db.collectionNames( function(error, names) {
		if (error) {
			throw new Error(error);
		} else {
			console.log(names);
		}
	});
});

//db.close();

/* Schemas */
var Schema = mongoose.Schema;

var Item = new Schema({
	name: { type: String, required: true},
	count: { type: Number, required: true}
});

/*
Item.path('name').validate( function(value) {
	return true;//value.length > 0 && value.length < 128;
});

Item.path('count').validate( function(value) {
	return true;//value > 0 && value < 1000000;
});
*/

var ItemModel = mongoose.model('Item', Item);

module.exports.ItemModel = ItemModel;
