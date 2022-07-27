var request = require('request');
const endpoint = "http://localhost:3030/user/authenticate"
it("first testing", () =>{
    expect(2 * 2).toBe(4)
})

describe("Hello World Server", function() {
    describe("GET /", function() {
      it("returns status code 200", function(done) {
        request.post(endpoint,{json: true, body: {}} ,function(error, response, body) {
          expect(body.json).toEqual(404);
        });
      });
    });
  });