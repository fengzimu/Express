var bcrypt = require("bcrypt-nodejs");
var mongoose = require("mongoose");
var SALT_FACTOR = 10;
var userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    displayName: String,
    bio: String,
});
var noop = function () { };
//Defines a function that runs before model is saved
userSchema.pre("save", function (done) {
    //Saves a reference to the user
    var user = this;
    if (!user.isModified("password")) {
        return done();
    }
    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        if (err) { return done(err); }
        bcrypt.hash(user.password, salt, noop, function (err, hashedPassword) {
            //Hashes the user’s password
            if (err) { return done(err); }
            user.password = hashedPassword;
            done();
        });
    });
});
//we use bcrypt.compare instead of a simple equality check (with something like ===) for security reasons
userSchema.methods.checkPassword = function (guess, done) {
    bcrypt.compare(guess, this.password, function (err, isMatch) {
        done(err, isMatch);
    });
};
userSchema.methods.name = function () {
    return this.displayName || this.username;
};
var User = mongoose.model("User", userSchema);
module.exports = User;