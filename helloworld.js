var express = require('express');

//port 8080

var app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})

//open http://localhost:8080/ to see app