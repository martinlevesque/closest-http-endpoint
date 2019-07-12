
const helpers = require("./helpers")
const constants = require("./constants")
const { timeout, TimeoutError } = require("promise-timeout")

async function closestHttpEndpoint(urls, opts = {}) {
  if ( ! opts.timeoutRequest) {
    opts.timeoutRequest = constants.DEFAULT_TIMEOUT_REQUEST
  }

  const delays = await Promise.all(urls.map((url) => {
    return timeout(helpers.delayOf(url, opts), opts.timeoutRequest * 1000)
      .then((result) => result)
      .catch((err) => {
        return {
          url,
          delay: constants.INVALID_DELAY
        }
      })
  }))

  return delays.reduce((min, delayUrl) => {
    return delayUrl.delay < min.delay ? delayUrl : min
  }, { delay: constants.INVALID_DELAY }).url
}

module.exports = (opts) => {
  return async (urls) => {
    return await closestHttpEndpoint(urls, opts)
  }
}
