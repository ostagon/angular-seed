/** Server on NodeJS Express for REST on MongoDB backend **/
var express = require('express');
var path  = require('path');

var app = express();

//app.use(express.logger('dev'));    // выводим все запросы со статусами в консоль
app.use(express.json());     // стандартный модуль, для парсинга JSON в запросах
app.use(express.urlencoded());
//app.use(express.methodOverride()); // поддержка put и delete
//app.use(app.router);               // модуль для простого задания обработчиков путей
//app.use(express.static(path.join(__dirname, "public")));

// rest api
app.get('/restapi', function (req, res) {
    res.send('API is running');
});

// run server
var server = app.listen( 1337, function() {
	console.log('Express server on port %d', server.address().port);
});

