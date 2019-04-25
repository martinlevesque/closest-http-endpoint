const expect = require('expect.js');
const index = require("../index.js");
const nock = require("nock");

const defaultOptions = {
  timeRequest: 3
}

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

      const result = await index(defaultOptions)([`http://google.com/`])
      expect(result).to.equal("http://google.com/")
    })

    it("with short timeout", async function() {
      nock("http://google.com")
        .get('/')
        .delayConnection(0.2)
        .reply(200, {
          "site_name": "mysite",
          "valid": true
         });

      const result = await index({ timeoutRequest: 0.1 })([`http://google.com/`])
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

      const result = await index(defaultOptions)([`http://google.com/`, `http://yahoo.com/`])
      expect(result).to.equal("http://google.com/")
    })
  })
})
