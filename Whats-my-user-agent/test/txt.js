var app = require("../app");
var supertest = require("supertest");
describe("plain text response", function () {
    var request;
    beforeEach(function () {
        request = supertest(app)
            .get("/")
            .set("User-Agent", "my cool browser")
            .set("Accept", "text/plain");
    });
    it("returns a plain text response", function (done) {
       /*  //SuperTest builds up the request
        supertest(app)
        //visit the '/' URL
            .get("/")
        //Sets the UserAgent header
            .set("User-Agent", "my cool browser")
        //Sets a header describing what content type we want back from the server
            .set("Accept", "text/plain") */
        request
        //Expects the content type to match "text/plain
            .expect("Content-Type", /text\/plain/)
        //Expects the HTTP status code to be 200
            .expect(200)
        //Calls the done callback because our tests are finished
            .end(done);
    });
    it("returns your User Agent", function (done) {
        /* supertest(app)
            .get("/")
            .set("User-Agent", "my cool browser")
            .set("Accept", "text/plain") */
            request
            .expect(function (res) {
                if (res.text !== "my cool browser") {
                    throw new Error("Response does not contain User Agent");
                }
            })
            .end(done);
    });
});