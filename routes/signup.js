var express = require('express')
var router = express.Router();
var AWS = require('aws-sdk');

AWS.config.update({
	region: "us-west-2",
	endpoint: "dynamodb.us-west-2.amazonaws.com",
	accessKeyId: "",
	secretAccessKey: ""

});

var ddb = new AWS.DynamoDB();



// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

// define the SignUp route
router.post('/', function (req, res) {
  //res.send('Signing Up!!')
  var item = {
    'email': {'S': req.body.email},
    'name': {'S': req.body.name},
    'phone':{'S': req.body.phone},
    'zip':{'S': req.body.zip}
  };

  ddb.putItem({
    'TableName': 'StartupSignupsTable',
    'Item': item,
    'Expected': { email: { Exists: false } }
  },
     function(err, data){
            if(err){
              var returnStatus = 500;
              if (err.code === 'ConditionalCheckFailedException') {
                  returnStatus = 409;
              }
              res.status(returnStatus).end();
              console.log('DDB Error: ' + err);
            }else{
                res.status(201).end();
            }
  });

})

// define the SignUp/Details route
router.get('/details', function (req, res) {
  res.send('About You')
})

module.exports = router
