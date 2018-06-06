var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var flash = require("connect-flash");
var passport = require("passport");
var routes = require("./routes");
var setUpPassport = require("./setuppassport");
var app = express();
//connect to mongodb db in C:\Mongodb\db
mongoose.connect("mongodb://localhost:27017/db");
setUpPassport();
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//Setting body-parser’s extended option to false makes the parsing simpler and more secure
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//Needs to be a bunch of random characters(not necessarily what are shown here)
app.use(session({
    secret: "TKRv0IJs=HYqrvagQ#&!F!%V]Ww/4KiVs$s,<<MX",
    //When it’s set to true, the session will be updated even when it hasn’t been modified
    resave: true,
    //This resets sessions that are uninitialized.
    saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);
app.listen(app.get("port"), function () {
    console.log("Server started on port " + app.get("port"));
});