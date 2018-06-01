var express = require("express");
var app = express();
app.get("/olivia", function (request, response) {
    response.send("Welcome to Olivia’s homepage!");
});
//Let’s imagine that you want to match things like /users/123 or /users/456 but not/users/olivia. 
app.get(/^\/users\/(\d+)$/, function (req, res) {
    var userId = parseInt(req.params[0], 10);
    // ...
});
//You might want, for example, to define a route that looks for ranges; that is, if you visit / users / 100 - 500

app.get(/^\/users\/(\d+)-(\d+)$/, function (req, res) {
    var startId = parseInt(req.params[0], 10);
    var endId = parseInt(req.params[1], 10);
    // …
});

var horribleRegexp = /^([0-9a-f]{8}-[0-9a-f]{4}-4[0 - 9a - f]{ 3 } -[89ab][0 - 9a - f]{ 3 } -[0 - 9a - f]{ 12 }) $ / i;
app.get(horribleRegexp, function (req, res) {
    var uuid = req.params[0];
    // ...
});

app.use(function (request, response) {
    response.status(404).send("Page not found!");
});
app.listen(3000);