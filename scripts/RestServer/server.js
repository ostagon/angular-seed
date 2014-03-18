/** Server on NodeJS Express for REST on MongoDB backend **/
var express	    = require('express');
var path		= require('path');
var config 		= require('./libs/config');
//var log		 	= require('./libs/log')(module);
var mongoose 	= require('./libs/mongoose');

var app = express();

app.use(express.logger('dev'));   	 // выводим все запросы со статусами в консоль
app.use(express.json());         	 // стандартный модуль, для парсинга JSON в запросах
app.use(express.urlencoded());
app.use(require('formidable')());    // mimeencoded

/* Items Model */
var ItemModel = mongoose.ItemModel;

// Status 404, 500, error
/*
app.use( function(req, res, next) {
	res.status(404);
	res.send({ error: "Not found"});
	return;
});
*/

app.use( function (err, req, res, next) {
	res.status(err.status || 500);
	res.send({ error: err.message});
	return;
});

// error example
app.get('/error', function (req, res, next) {
	next(new Error("Random error"));
});

// rest api
app.get('/restapi', function (req, res) {
    res.send({ status: 'API is running'});
});

// get origin ip
var getClientIp = function(req) {
  var ipAddress = null;
  var forwardedIpsStr = req.headers['x-forwarded-for'];
  if (forwardedIpsStr) {
    ipAddress = forwardedIpsStr[0];
  }
  if (!ipAddress) {
    ipAddress = req.connection.remoteAddress;
  }
  return ipAddress;
};

// check for white list for ips
var checkAllowOrigins = function(req, res, next) {
	
}

// add headers to every rest api response (fix with CORS)
var cors = function (req, res, next) {
	// log origin ip
	console.log('Origin: ' + getClientIp(req));
	// add headers
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
};

// all functions for pre restapi
var preRest = function (req, res, next) {
	checkAllowOrigins(req, res, 
	cors(req, res, next));
}

app.all('/restapi/*', cors);

// *** auth ***
// auth: begin
app.post('/restapi/auth', function (req, res) {
	var auth = { 
		db:   req.body.db,
		user: req.body.user,
		pass: req.body.pass
	};	
	
});
// auth: end

// *** crud begin ***
// crud: read: get all items 
app.get('/restapi/items', function (req, res) {
    return ItemModel.find( function(err, items) {
		if (!err) {
			return res.send(items);
		} else {
			res.statusCode = 500;
			return res.send({ error: "Ошибка на сервере"});
		}
	});
});

// crud: create: add new item
app.post('/restapi/items', function (req, res) {
	var item = new ItemModel({
		name: req.body.name,
		count: req.body.count
	});
	
    item.save( function(err) {
		if (!err) {
			return res.send({ status: 'OK', item: item});
		} else {
			console.log(err);
			if (err.name == 'ValidationError') {
				res.statusCode = 400;
				res.send({ error: "Ошибка при валидации"});
			} else {
				res.statusCode = 500;
				res.send({ error: "Ошибка на сервере"});
			}
		}
	});
});

// crud: read: get item with id
app.get('/restapi/items/:id', function (req, res) {
    return ItemModel.findById(req.params.id, function(err, item) {
		if (!item) {
			res.statusCode = 404;
			return res.send({ error: "Элемент не найден"});
		}
		if (!err) {
			return res.send({ status: 'OK', item: item});
		} else {
			res.statusCode = 500;
			return res.send({ error: "Ошибка на сервере"});
		}
	});
});

// crud: update: update item with id
app.put('/restapi/items/:id', function (req, res) {
    return ItemModel.findById(req.params.id, function(err, item) {
		if (!item) {
			res.statusCode = 404;
			return res.send({ error: "Элемент не найден"});
		}
		
		// TODO: change with some checks
		item.name = req.body.name;
		item.count = req.body.count;
		
		return item.save( function(err) {
			if (!err) {
				return res.send({ status: 'OK', item: item});
			} else {
				console.log(err);
				if (err.name == 'ValidationError') {
					res.statusCode = 400;
					return res.send({ error: "Ошибка при валидации"});
				} else {
					res.statusCode = 500;
					return res.send({ error: "Ошибка на сервере"});
				}
			}
		});
	});
});

// crud: delete: delete item with id
app.delete('/restapi/items/:id', function (req, res) {
    return ItemModel.findById(req.params.id, function(err, item) {
		if (!item) {
			res.statusCode = 404;
			return res.send({ error: "Элемент не найден"});
		}
		
		return item.remove( function(err) {
			if (!err) {
				return res.send({ status: 'OK'});
			} else {
				res.statusCode = 500;
				return res.send({ error: "Ошибка на сервере"});
			}
		});
	});
});
// *** crud end ***



// run server
var server = app.listen( config.get('port'), function() {
	console.log('Express server on port %d', server.address().port);
});

