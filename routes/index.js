const express = require('express');
const AWS = require("aws-sdk");
const uuid = require('uuid');
const router = express.Router();

AWS.config.update({
  region: "local",
  endpoint: "http://localhost:8000"
});

const dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

router.get('/', async function(req, res, next) {
  const dbVal = await docClient.scan({TableName: "Circuit"}).promise();
  console.log(dbVal);
  res.json(dbVal);
});

router.post('/addCircuit', async function(req, res, next){
  console.log(req.body);
  const newParam = {
    TableName: "Circuit",
    Item: {
      id: uuid.v4().toString(),
      ...req.body
    }
  };
  await docClient.put(newParam, function(err, data) {
    if (err) {
        console.error(err);
    } else {
        console.log("PutItem succeeded:", req.body.Title);
    }
  });
  const dbVal = await docClient.scan({TableName: "Circuit"}).promise();
  console.log(dbVal);
  res.json(dbVal);
});

module.exports = router;
