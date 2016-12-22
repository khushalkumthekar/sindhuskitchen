var express = require('express');
var router = express.Router();
var https = require('https');
//var HttpsProxyAgent = require('https-proxy-agent');
var dateFormat = require('dateformat');

/* GET home page. */
router.get('/', function(req, res, next) {
  var responseString = "";
  //var agent = new HttpsProxyAgent({
    //host: 'webproxysea.nordstrom.net',
    //port: 8181
  //});
  
  var optionsget = {
    host : 'graph.facebook.com', // here only the domain name
    // (no http/https !)
    port : 443,
    path : '/v2.8/sindhuskitchen/posts?limit=50&fields=message%2Ccreated_time%2Cid%2Cfull_picture&access_token='+process.env.ACCESS_TOKEN, // the rest of the url with parameters if needed
    method : 'GET', // do GET
	//agent: agent
  } ;
  
  //console.info('Options prepared:');
  //console.info(optionsget);
  //console.info('Do the GET call');

  // do the GET request
  var reqGet = https.request(optionsget, function(res1) { 
    //console.log("statusCode: ", res1.statusCode);
    // uncomment it for header details
  //  console.log("headers: ", res1.headers);


    res1.on('data', function(d) {
        //console.info('GET result:\n');
        //process.stdout.write(d);
		responseString+=d;
        //console.info('\n\nCall completed');
    });
	
	 res1.on('end', function() { 
	  //console.info('\n\nCall completed');
      //process.stdout.write(responseString);
	  var responseJson = JSON.parse(responseString);
	  //process.stdout.write(JSON.stringify(responseJson.data));
	  var posts = [];
	  responseJson.data.forEach (function(post) {
		  var msg =  post.message;
		  if(msg){
			if(msg.indexOf('christmas')>-1){
               var postDate = Date.parse(post.created_time);
               post.message = msg.replace('December is here! Countdown to Christmas starts now. ', '').substring(15);
               post.created_time = dateFormat(postDate,"longDate");
			   posts.push(post);
			}
		  }
	  });
	   
	  res.render('index', { title: posts });
    });

   });

   reqGet.end();
   reqGet.on('error', function(e) {
    console.error(e);
   });
   
  
});

module.exports = router;
