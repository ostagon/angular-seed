/** Mongoose with NodeJS for MongoDB **/
var mongoose = require('mongoose');
var options = { user: 'user', pass: 'user'};
mongoose.connect('mongodb://localhost:27017/greenlist', options);

var db = mongoose.connection;

db.on('open', function() {
	mongoose.connection.db.collectionNames( function(error, names) {
		if (error) {
			throw new Error(error);
		} else {
			console.log(names);
		}
	});
});



//db.close();
