
var express = require("express");
var http = require("http");
var url = require("url");
var path = require("path");

var app = express();

var timeStamp;
var result;

app.use(express.static(__dirname + '/View'));
//Store all HTML files in view folder.
app.use(express.static(__dirname + '/Scripts'));
//Store all JS and CSS in Scripts folder.

app.get('/',function(request,response){
  response.sendFile('index.html');
  //It will find and locate index.html from View or Scripts
});

app.use(function(request, response, next) {
    
  console.log("In comes a " + request.method + " to " + request.url);
  var parsedUrl = request.url.slice(1);
  
  // if decodeURIComponent(parsedUrl) contains non-numbers, then use as is. -> date.parse
  // else if only numbers, parseInt * 1000
    var re = /[^0-9]/g;
    parsedUrl = re.test(decodeURIComponent(parsedUrl)) ? Date.parse( decodeURIComponent(parsedUrl)) : parseInt(decodeURIComponent(parsedUrl)) * 1000;
 
   if (!isNaN( parsedUrl) ){
        console.log("That's a date!")
        timeStamp = new Date(parsedUrl);
        console.log(timeStamp)
        result = {
            unix: timeStamp.getTime() / 1000, 
            natural: timeStamp.toDateString()
            }
            console.log(result)
    } else {
        console.log("Sorry! That's not a real date!")
        result = {
            unix: null,
            natural: null
            }
    }
  next();
    
});

// Send "timestamp result"
app.use(function(request, response) {
  response.writeHead(200, { "Content-Type": "application/json" });
  response.end(JSON.stringify(result));
});

 http.createServer(app).listen(8080);


