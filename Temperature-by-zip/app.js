//Includes Node’s built-in path module
var path = require("path");
var express = require("express");
var zipdb = require("zippity-do-dah");
var ForecastIo = require("forecastio");

var app = express();
var weather = new ForecastIo("edd2835fd08ad9cd3d9272aeda68d9b8");
//Serves static files out of public
app.use(express.static(path.resolve(__dirname, "public")));
//ses EJS as the view engine, and serves the views out of a views folder
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

//Renders the index view if you hit the homepage
app.get("/", function (req, res) {
    res.render("index");
});

app.get(/^\/(\d{5})$/, function (req, res, next) {
    //Captures the specified ZIP Code and passes it as req.params[0]
    var zipcode = req.params[0];
    //Grabs location data wit the ZIP Code
    var location = zipdb.zipcode(zipcode);
    if (!location.zipcode) {
        next();
        return;
    }

    var latitude = location.latitude;
    var longitude = location.longitude;
    weather.forecast(latitude, longitude, function (err, data) {
        if (err) {
            next();
            return;
        }
        //Sends this JSON object with Express’s json method
        res.json({
            zipcode: zipcode,
            temperature: data.currently.temperature
        });
    });
});

app.use(function (req, res) {
    res.status(404).render("404");
});
app.listen(3000);