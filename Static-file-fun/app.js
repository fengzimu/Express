var express = require("express");
var path = require("path");
var fs = require("fs");
var morgan = require("morgan");
var app = express();
//short is a configuration options('combined', 'tiny') of morgan
app.use(morgan("short"));

/* app.use(function (req, res, next) {
    console.log("Request IP: " + req.url);
    console.log("Request date: " + new Date());
    //This is the critical new line
    next();
}); */

var staticPath = path.join(__dirname, "static");
//The middleware function works like below function does
app.use(express.static(staticPath));

/* app.use(function (req, res, next) {
    //Uses path.join to find the path where the file should be
    var filePath = path.join(__dirname, "static", req.url);
    fs.stat(filePath, function (err, fileInfo) {
        if (err) {
            next();
            return;
        }
        //If the file exists, call res.sendFile ...
        if (fileInfo.isFile()) {
            res.sendFile(filePath);
        } else {
            next();
        }
    });
}); */

app.use(function (req, res, next) {
    res.sendFile(filePath, function (err) {
        if (err) {
            next(new Error("Error sending file!"));
        }
    });
});


app.use(function (err, req, res, next) {
    //logs error
    console.error(err);
    next(err);
});

app.use(function (err, req, res, next) {
    res.status(500);
    res.send("Internal server error.");
});

app.use(function (req, res) {
    res.status(404);
    res.send("File not found!");
});

/* app.use(function (request, response) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Hello, world!");
}); */

app.listen(3000, function () {
    console.log("App started on port 3000");
});