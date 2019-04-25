
const helpers = require("./helpers")

async function closestHttpEndpoint(urls) {
  const delays = await Promise.all(urls.map((url) => helpers.delayOf(url)))

  return delays.reduce((min, delayUrl) => {
    return delayUrl.delay < min.delay ? delayUrl : min
  }, { delay: helpers.MAX_DELAY }).url
}

module.exports = closestHttpEndpoint
