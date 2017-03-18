var express = require('express')
var aws = require('aws-sdk');
var router = express.Router();

aws.config.update({
	region: "us-west-2",
	endpoint: "dynamodb.us-west-2.amazonaws.com",
	accessKeyId: "", //add key here
	secretAccessKey: "" //add key here
});

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

// Use http://localhost:8080/user?userID=ritwij to test.
router.get('/', function (req, res) {
	console.log("req :: ", req.params["userID"])
	var params={
		TableName:'User',
		KeyConditionExpression: 'UserId = :userid',
		ExpressionAttributeValues: {
			':userid':req.param('userID')
		}
	}

	var docclient = new aws.DynamoDB.DocumentClient();
	docclient.query(params, function(err, data){
		if(err){
			console.log(err);
			res.send(err);
		}else{
			console.log(data);
			res.send(data);
		}
	});
})

// define route for use
router.post('/', function (req, res) {
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
			res.send(data);
		}else{
			console.log(data);
			res.send(data);
		}
	});
  
})

module.exports = router