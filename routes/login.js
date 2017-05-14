var express = require('express')
var aws = require('aws-sdk');
var router = express.Router();
var path = require('path')
var app = express()
app.use('/static', express.static(path.join(__dirname, 'public')))

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

console.log("coming inside login!!")
// Use http://localhost:8080/user?userID=ritwij to test.
router.get('/', function (req, res) {
	console.log("req :: ", req.params["email_id"])
	var params={
		TableName:'StartupSignupsTable',
		KeyConditionExpression: 'email = :email_id',
		ExpressionAttributeValues: {
			':email_id':req.param('email_id')
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
	console.log("inisde login post!!");
	console.log("inisde login post!! ::", req.body);
	console.log("inisde login post!! ::", req.body.email_id);
	
	//res.send('Successful POST request');
	
	var params = {
		TableName : "StartupSignupsTable",
		KeyConditionExpression: "#email_attr_name = :email_attr_value",
		ExpressionAttributeNames:{
			"#email_attr_name": "email"
		},
		ExpressionAttributeValues: {
			":email_attr_value":req.body.email
		}
	};
	var docClient = new aws.DynamoDB.DocumentClient();
	docClient.query(params, function(err, data) {
		if (err) {
			console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
			 res.status(returnStatus).end();
		} else {
			console.log("Query succeeded.");
			data.Items.forEach(function(item) {
				console.log(" -", item.email + ": " + item.password);
				if(req.body.password === item.password){
					console.log("password matches!!");
					res.status(201).end();
					res.send(data);
				}else{
					console.log("password mis-match!!");
					res.status(201).end();
					res.send(data);
				}
				
			});
		}
	});
  
})

module.exports = router