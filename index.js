var express = require('express');
var webshot = require('webshot');
var fs      = require('fs');
var temp    = require("temp");
var http = require("http");
var https = require("https");
var request = require('request');


var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
//  /^\/(.+)/
app.get("/repos/(*)", function(req, res) {
  var self = this;
  var repo = req.params[0];
  //console.log(repo);
  var html = "<br/><table><tr><th>Builds</th></tr>";
   var options = {
    url: "https://api.travis-ci.org/repos/" + repo,
    headers: {
         'Accept': 'application/vnd.travis-ci.2+json'
       }
   };
request(options, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    //console.log(body); 
    var buildId = JSON.parse(body).branch.id;
    if(!buildId){
      res.status(400);
      url = req.url;
      res.send('Branch build id not found');
    }
    var options2 = {
       url: "https://api.travis-ci.org/builds/" + buildId,
       headers: {
         'Accept': 'application/vnd.travis-ci.2+json'
       }
     };
     //console.log(options2.url);
    request(options2, function (error2, response2, body2) {
      if (!error2 && response2.statusCode == 200) {
       //console.log(body2);
       var jobs = JSON.parse(body2).jobs;
       if (!jobs){
         res.status(400);
         url = req.url;
         res.send('Jobs not found in build');
       }
       jobs.forEach(function(job) {
           var state = job.state;
           var number = job.number;
           html += "<td>" + number + " "
           if(state == "passed"){
             html += "<span style='color:green;'>passed</span>";
           } else if (state == "failed"){
             html += "<span style='color:red;'>failed</span>";
           } else {
             html += state;
           }
            + state;
           html += "</td></tr>";
       });
       //console.log(html);
       html += "</table>";
       html += "<br/>Build ID: " + buildId;
       screenShot(html, function(original, cleanupScreenShot){
          writeFileToResponse(original, res, function(){
            cleanupScreenShot();
          });
       });
       } else {
          res.status(400);
          url = req.url;
          res.send('Error retrieving build');
       }
       
    });

  } else {
    res.status(400);
    url = req.url;
    res.send('Branch build id not found');
    }
}) 
   
  

});
  
app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

function createTempPng(){
  return temp.path({suffix: '.png'});
}

function writeFileToResponse(file, resp, callback){
  resp.writeHead(200, { 'Content-Type': 'image/png' });
  fs.readFile(file, function(err, data){
    resp.end(data);
    callback();
  });
}

function cleanupTempFile(file){
  fs.unlink(file, function(err){
    if(err) console.error(err);
  });  
}

function screenShot(html, callback){
  var original = createTempPng();
  var options = {
    shotSize: {
      width: 320
    , height: 'all' 
    }
    , siteType:'html'
  }
  webshot(html, original, options, function(err){
    callback(original, function(){
      cleanupTempFile(original);
    });
  });
}

