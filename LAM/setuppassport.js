var passport = require("passport");
var User = require("./models/user");
/* 1 Look for a user with the supplied username.
    2 If no user exists, then your user isn’t authenticated; say that you’ve finished with
    the message “No user has that username!”
    3 If the user does exist, compare their real password with the password you supply.If the password matches, return the current user.If it doesn’t, return
    “Invalid password.” */
var LocalStrategy = require("passport-local").Strategy;
module.exports = function () {
    //serializeUser should turn a user object into an ID. You call done with no error and the user’s ID.
    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });
    //deserializeUser should turn the ID into a user object. Once you’ve finished, you call done with any errors and the user object.
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
    passport.use("login", new LocalStrategy(//Tells Passport to use a local strategy
        function (username, password, done) {
            //Uses a MongoDB query you’ve seen before to get one user
            User.findOne({ username: username }, function (err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false,
                    { message: "No user has that username!" });
                }
                user.checkPassword(password, function (err, isMatch) {
                    if (err) { return done(err); }
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false,
                        { message: "Invalid password." });
                    }
                });
            });
        }));
};