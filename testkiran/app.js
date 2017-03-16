var express = require('/usr/local/lib/node_modules/npm/node_modules/express')

var bodyParser = require('body-parser');

var aws = require('/usr/local/lib/node_modules/npm/node_modules/aws-sdk');

aws.config.update({
	region: "us-west-2",
	endpoint: "dynamodb.us-west-2.amazonaws.com",
	accessKeyId: "",
	secretAccessKey: ""

});

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

app.route('/user')
	.get(function(req, res){

		var params={
			TableName:'User',
			KeyConditionExpression: 'UserId = :userid',
			ExpressionAttributeValues: {
				':userid':'kiran'
			}
		}

		var docclient = new aws.DynamoDB.DocumentClient();

		docclient.query(params, function(err, data){
			if(err){
				console.log(err);
			}else{
				console.log(data);
			}
		});

	})
	.post(function(req, res){
		
		console.log(req.body);
		res.send('Successful POST request');

		var params={
			TableName:'User',
			Item : {
				"UserId":req.body.name
			}
		}

		var docclient = new aws.DynamoDB.DocumentClient();

		docclient.put(params, function(err, data){
			if(err){
				console.log(err);
			}else{
				console.log(data);
			}
		});

	});


app.listen(8080, function(){
	console.log('Example app running');
});

