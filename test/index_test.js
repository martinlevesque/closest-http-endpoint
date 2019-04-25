const expect = require('expect.js');
const index = require("../index.js");
const nock = require("nock");

describe("index", function() {
  describe('closestHttpEndpoint', function() {
    it("with single url", async function() {
      nock("http://google.com")
        .get('/')
        .delayConnection(0)
        .reply(200, {
          "site_name": "mysite",
          "valid": true
         });

      const result = await index([`http://google.com/`])
      expect(result).to.equal("http://google.com/")
    })

    it("with multiple urls", async function() {
      nock("http://google.com")
        .get('/')
        .delayConnection(0)
        .reply(200, {
          "site_name": "mysite",
          "valid": true
         });

       nock("http://yahoo.com")
         .get('/')
         .delayConnection(0.5)
         .reply(200, {
           "site_name": "mysite",
           "valid": true
          });

      const result = await index([`http://google.com/`, `http://yahoo.com/`])
      expect(result).to.equal("http://google.com/")
    })
  })
})
