var express = require('express');
var router = express.Router();
var https = require('https');

/* GET users listing. */

  
  var optionsget = {
    host : 'graph.facebook.com', // here only the domain name
    // (no http/https !)
    port : 443,
    path : '/v2.8/sindhuskitchen/posts?limit=50&fields=message%2Ccreated_time%2Cid%2Cfull_picture&access_token=EAACEdEose0cBAEiAE1LqbQcWj7Lsen4GtUe0lpKtS6NmzcP0FZB2HhAB95Wrog7Y1FSKqq9VFkGhSk3OaECZCll5uq2rjsJ5iGGj7lMhLrXj5QnmikoJtrKyCRB7Kt2J1OCXO5xixxH3E1PZCAz6g0uY0xf0kcjX54VfDnOSZC4IxAexRcb2O9t2poOYpkYZD', // the rest of the url with parameters if needed
    method : 'GET' // do GET
  } ;
  
  console.info('Options prepared:');
  console.info(optionsget);
  console.info('Do the GET call');

  // do the GET request
  var reqGet = https.request(optionsget, function(res1) { 
    console.log("statusCode: ", res1.statusCode);
    // uncomment it for header details
  //  console.log("headers: ", res1.headers);


    res1.on('data', function(d) {
        //console.info('GET result:\n');
        //process.stdout.write(d);
		responseString+=d;
        //console.info('\n\nCall completed');
    });
	
	 res1.on('end', function() { 
	  console.info('\n\nCall completed');
      process.stdout.write(responseString);
    });

   });

   reqGet.end();
   reqGet.on('error', function(e) {
    console.error(e);
   });
  
  res.send("respone");
});

module.exports = router;
