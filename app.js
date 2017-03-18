var express = require('express')
var bodyParser = require('body-parser');
var login = require('./routes/login')
var user = require('./routes/user')

var app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//remove this
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res){
	res.send('Hello World!')
});

//Add Routers Below
app.use('/login', login)
app.use('/user', user)


app.listen(8080, function(){
	console.log('Example app running');
});

