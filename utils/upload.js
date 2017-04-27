var AWS = require('aws-sdk');

var S3 = new AWS.S3();

var myBucket = 'my.unique.bucket.name.karthik';
var myKey = 'myBucketKey';

//Create new Bucket, If not Created earlier
S3.createBucket({Bucket: myBucket}, function(error, data){
  if(error){
    console.log("Bucket Creation Failed :: ", error);
  }else{
    console.log("Bucket created Successfully")
    params = {Bucket: myBucket, Key: myKey, Body: 'Hello!'};
    //S3.putObject(params, function(error, data){

    //});

    S3.upload({Key: "karthik.image.123", Body:""}, function(){

    });


  }
});
