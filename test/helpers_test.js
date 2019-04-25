const expect = require('expect.js');
const helpers = require("../helpers.js");
const nock = require("nock");

describe("helpers", function() {
  describe("getProtocolPkg", function() {
    it("with http url", function() {
      const pkg = helpers.getProtocolPkg(`http://google.com/`)
      expect(pkg.globalAgent.protocol).to.equal("http:")
    })

    it("with https url", function() {
      const pkg = helpers.getProtocolPkg(`https://google.com/`)
      expect(pkg.globalAgent.protocol).to.equal("https:")
    })

    it("with invalid url", function() {
      const pkg = helpers.getProtocolPkg(`google`)
      expect(pkg.globalAgent.protocol).to.equal("http:")
    })
  })

  describe('delayOf', function() {
    it("with valid url", async function() {
      nock("http://google.com")
        .get('/')
        .delayConnection(500)
        .reply(200, {
          "site_name": "mysite",
          "valid": true
         });

      const result = await helpers.delayOf(`http://google.com/`)
      expect(result.delay >= 0.5 && result.delay <= 0.6).to.equal(true)
      expect(result.url).to.equal("http://google.com/")
    })

    it("with large delay should fail", async function() {
      this.timeout(4000)

      nock("http://google.com")
        .get('/')
        .delayConnection(3200)
        .reply(200, {
          "site_name": "mysite",
          "valid": true
         });

      const result = await helpers.delayOf(`http://google.com/`)
      expect(result.delay >= 3.0).to.equal(true)
      expect(result.url).to.equal("http://google.com/")
    })
  })
})
