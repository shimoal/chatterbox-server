/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
//var Router = require('router');
var fs = require('fs');
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};


var storage = [{username: 'moo', message: 'me'}];

fs.writeFile('./file/storage.txt', JSON.stringify(storage), function(err) {
  if (err) {
    console.log(err, "error in write file");
  }
  console.log('init storage');
});

var requestHandler = function(request, response) {

  fs.readFile('./file/storage.txt', 'utf8', function(err, data) {
    if (err) {
      console.log('there was an error reading storage: ', err);
    }
    var storageData = JSON.parse(data);
    storage = storageData;

  });
//storage = JSON.parse(storage);

  var body = { results: [] };
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.

  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  // The outgoing status.
  var statusCode = 200;

  var headers = defaultCorsHeaders;

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.


  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  headers['Content-Type'] = 'application/JSON';

  // if (request.url === './' ) {
  //   fs.readFile('./../client/index.html', function(err, data) {

  //     if (err) {

  //       response.writeHead(500);
  //       response.end();
  //     } else {
  //       console.log('data', data);
  //       response.writeHead(200, { 'Content-Type': 'text/html'});
  //       response.end(data, 'utf-8');
  //     }
  //   });
  // } 

  if (request.method === 'GET') { 
    console.log(storage[0]);
    for (var i = 0; i < storage.length; i++) {
      body.results.push(storage[i]);
    }
    statusCode = 200;
  } else if (request.method === 'POST') {
    console.log('storage in post', storage);
    request.on('data', function(chunk) {
      chunk = JSON.parse(chunk.toString('utf-8'));
      chunk.createdAt = new Date();
      chunk.objectId = (Math.floor(Math.random() * 10000000000)).toString();
      storage.push(chunk);

      fs.writeFile('./file/storage.txt', JSON.stringify(storage), function(err) {
        if (err) {
          console.log(err, 'error in write file');
        }
        console.log('chunk to storage');
      });

    });
    statusCode = 201;


  } 


  response.writeHead(statusCode, headers);
  // See the note below about CORS headers.


  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.


  response.end(JSON.stringify(body));


};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.



exports.requestHandler = requestHandler;

