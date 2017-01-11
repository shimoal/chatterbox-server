/* Import node's http module: */
//var finalhandler = require('finalhandler');
//var Router = require('router');
var fs = require('fs');
var http = require('http');
var handleRequest = require('./request-handler');
// var _ = require('underscore');
// var $ = require('jquery');
var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.listen(3000, function() {
  console.log('example app listening on port 3000');
});






// Every server needs to listen on a port with a unique number. The
// standard port for HTTP servers is port 80, but that port is
// normally already claimed by another server and/or not accessible
// so we'll use a standard testing port like 3000, other common development
// ports are 8080 and 1337.
// For now, since you're running this server on your local machine,
// we'll have it listen on the IP address 127.0.0.1, which is a
// special address that always refers to localhost.

// var port = 3000;
// var ip = '127.0.0.1';
// server = http.createServer(function(request, response) {
//     console.log(request.url, 'this is my url');
//      if (request.url === '/classes/messages') {
//     requestHandler(request, response);
//   } else {
//     console.log('EROROROROR');
//   }

  //fs.readFile('./../client/index.html', function(err, data) {

    
//});

//}).listen(port);


  // var requestHandler = handleRequest.requestHandler;

  // var server = http.createServer(requestHandler);
  // console.log('Listening on http://' + ip + ':' + port);
server.listen(port, ip);
  //console.log(data);
// });


// We use node's http module to create a server.
//
// The function we pass to http.createServer will be used to handle all
// incoming requests.
//
// After creating the server, we will tell it to listen on the given port and IP. */


// To start this server, run:
//
//   node basic-server.js
//
// on the command line.
//
// To connect to the server, load http://127.0.0.1:3000 in your web
// browser.
//
// server.listen() will continue running as long as there is the
// possibility of serving more requests. To stop your server, hit
// Ctrl-C on the command line.

