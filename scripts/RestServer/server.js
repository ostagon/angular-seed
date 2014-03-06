/** Server on NodeJS Express for REST on MongoDB backend **/
var express	    = require('express');
var path		= require('path');
var config 		= require('./libs/config');
//var log		 	= require('./libs/log')(module);
var mongoose 	= require('./libs/mongoose');

var app = express();

app.use(express.logger('dev'));    // выводим все запросы со статусами в консоль
app.use(express.json());     // стандартный модуль, для парсинга JSON в запросах
app.use(express.urlencoded());
app.use(require('formidable')());    // mimeencoded
//app.use(express.methodOverride()); // поддержка put и delete
//app.use(app.router);               // модуль для простого задания обработчиков путей
//app.use(express.static(path.join(__dirname, "public")));


// Status 404, 500, error
/*
app.use( function(req, res, next) {
	res.status(404);
	res.send({ error: "Not found"});
	return;
});
*/

app.use( function(err, req, res, next) {
	res.status(err.status || 500);
	res.send({ error: err.message});
	return;
});

// error example
app.get('/error', function(req, res, next) {
	next(new Error("Random error"));
});

// rest api
app.get('/restapi', function (req, res) {
    res.send('API is running');
});

// *** crud begin ***
// crud: read: get all items 
app.get('/restapi/items', function (req, res) {
    res.send('В процессе разработки');
});

// crud: create: add new item
app.post('/restapi/items', function (req, res) {
    res.send('В процессе разработки');
});

// crud: read: get item with id
app.get('/restapi/items/:id', function (req, res) {
    res.send('В процессе разработки');
});

// crud: update: update item with id
app.put('/restapi/items/:id', function (req, res) {
    res.send('В процессе разработки');
});

// crud: delete: delete item with id
app.delete('/restapi/items/:id', function (req, res) {
    res.send('В процессе разработки');
});
// *** crud end ***



// run server
var server = app.listen( config.get('port'), function() {
	console.log('Express server on port %d', server.address().port);
});

