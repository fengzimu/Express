var express = require("express");
var http = require("http");
var logger = require("morgan");

var app = express();

app.use(logger("short"));
//middleware:request handler and response results
/* This app might have three middleware functions: one that does logging, one that
does authentication, and one that responds with secret information */
/* app.use(function(req, res) {
    console.log("In comes a request to: " + req.url);
    res.end("Hello, world!");
});
 */
/* app.use(function(request, response, next) {
    console.log("In comes a " + request.method + " to " + request.url);
    // When finished, calls
    // next() to defer to the next
    // middleware in the chain
next();
}); * /

/* app.use(function(request, response, next) {
    var minute = (new Date()).getMinutes();
    if ((minute % 2) === 0) {
        next();
    } else {
        response.statusCode = 403;
        response.end("Not authorized.");
    }
});
app.use(function(request, response) {
    response.end('Secret info: the password is "swordfish"!');
}); */

app.use(function(request, response) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Hello, world!");
});
//starts the server
http.createServer(app).listen(3000);
//shorthand
//app.listen(3000);