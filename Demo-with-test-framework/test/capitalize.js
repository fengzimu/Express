//Requires the function you’re going to test
var capitalize = require("../capitalize");
//Requires Chai, then uses the expect property to make assertions in your tests
var chai = require("chai");
var expect = chai.expect;
//capitalize refer to the model
describe("capitalize", function () {
    //A specification with a title and code to run.At the Mocha level.
    it("capitalizes single words", function () {
        //Does the actual assertions.At the Chai level.
        expect(capitalize("express")).to.equal("Express");
        expect(capitalize("cats")).to.equal("Cats");
    });

    it("capitalizes single words", function () {
        it("makes the rest of the string lowercase", function () {
            expect(capitalize("javaScript")).to.equal("Javascript");
        });
    });

    it("leaves empty strings alone", function () {
        expect(capitalize("")).to.equal("");
    });

    it("leaves strings with no words alone", function () {
        expect(capitalize(" ")).to.equal(" ");
        expect(capitalize("123")).to.equal("123");
    });
    it("capitalizes multiple-word strings", function () {
        expect(capitalize("what is Express?")).to.equal("What is express?");
        expect(capitalize("i love lamp")).to.equal("I love lamp");
    });
    it("leaves already-capitalized words alone", function () {
        expect(capitalize("Express")).to.equal("Express");
        expect(capitalize("Evan")).to.equal("Evan");
        expect(capitalize("Catman")).to.equal("Catman");
    });
    it("capitalizes String objects without changing their values",
        function () {
            var str = new String("who is JavaScript?");
            expect(capitalize(str)).to.equal("Who is javascript?");
            expect(str.valueOf()).to.equal("who is JavaScript?");
        });

    it("throws an error if passed a number", function () {
        expect(function () { capitalize(123); }).to.throw(Error);
    });

    it("changes the value", function () {
        expect(capitalize("foo")).not.to.equal("foo");
    });
});

describe("User", function () {
    var user;
    //Runs before every test, so that the user is defined inside every test.
    beforeEach(function () {
        user = new User({
            firstName: "Douglas",
            lastName: "Reynholm",
            birthday: new Date(1975, 3, 20)
        });
    });
    it("can extract its name", function () {
        expect(user.getName()).to.equal("Douglas Reynholm");
    });
    it("can get its age in milliseconds", function () {
        var now = new Date();
        expect(user.getAge()).to.equal(now - user.birthday);
    });
});