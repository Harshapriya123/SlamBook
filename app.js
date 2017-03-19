var express = require('express')
var path = require('path')
var bodyParser = require('body-parser');
var signup = require('./routes/signup')
var user = require('./routes/user')

var app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use('/static', express.static(path.join(__dirname, 'public')))

//remove this
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res){
	res.render('index', {
		static_path: '/static',
		theme: process.env.THEME || 'flatly',
		flask_debug: process.env.FLASK_DEBUG || 'false'
	});
});

//Add Routers Below
app.use('/signup', signup)
app.use('/user', user)


//The Node.js platform sets the PORT environment variable to the port to which the proxy server passes traffic.
var port = process.env.PORT || 3000;

var server = app.listen(port, function () {
        console.log('Server running at http://127.0.0.1:' + port + '/');
});





























