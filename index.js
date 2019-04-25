
const helpers = require("./helpers")

async function closestHttpEndpoint(urls, opts = {}) {
  const delays = await Promise.all(urls.map((url) => helpers.delayOf(url)))

  return delays.reduce((min, delayUrl) => {
    return delayUrl.delay < min.delay ? delayUrl : min
  }, { delay: helpers.INVALID_DELAY }).url
}

module.exports = (opts) => {
  return async (urls) => {
    return await closestHttpEndpoint(urls, opts)
  }
}
