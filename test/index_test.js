const expect = require('expect.js');
const index = require("../index.js");
const nock = require("nock");

const defaultOptions = {
  timeRequest: 3
}

describe("index", function() {
  this.timeout(10000);

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

    it("with timeout with one responding", async function() {
      nock("http://google.com")
        .get('/')
        .delayConnection(1000000)
        .reply(200, {
          "site_name": "mysite",
          "valid": true
         });

       nock("http://yahoo.com/")
         .get('/')
         .delayConnection(1)
         .reply(200, {
           "site_name": "mysite",
           "valid": true
          });

      const opts = {
        timeoutRequest: 1
      }
      const result = await index(opts)([`http://google.com/`, `http://yahoo.com/`])
      expect(result).to.equal("http://yahoo.com/")
    })

    it("with timeout without response", async function() {
      nock("http://google.com")
        .get('/')
        .delayConnection(1000000)
        .reply(200, {
          "site_name": "mysite",
          "valid": true
         });

      const opts = {
        timeoutRequest: 1
      }
      const result = await index(opts)([`http://google.com/`])
      expect(result).to.equal(undefined)
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
