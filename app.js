var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var port = process.env.PORT || 3000;
var app = express();
var dbUrl = 'mongodb://localhost/movies'
mongoose.connect(dbUrl);

app.set("views", "./app/views/pages");
app.set("view engine", "jade");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({
	secret: 'Echo',
	store: new mongoStore({
		url: dbUrl,
		collection: 'sessions'
	})
  	//resave:false,
	//saveUninitialized:true
}));


if('development' === app.get('env')){
	app.set('showStackError', true);
	app.use(logger(':method :url :status'));
	app.locals.pretty = true;
	mongoose.set('debug', true);
}

require('./config/routes')(app);
app.use(express.static(path.join(__dirname, 'public')));
app.locals.moment = require('moment');
app.listen(port);
console.log("Page started on port " + port);



