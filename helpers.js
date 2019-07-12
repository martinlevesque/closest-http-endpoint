
const urlUtil = require("url")
const constants = require("./constants")

function getProtocolPkg(url) {
  if (url && url.includes(`https:`)) {
    return require("https")
  }

  return require("http")
}

function delayOf(url, opts = {}) {
  const t1 = new Date()

  return new Promise((resolve, reject) => {
    const parsedUrl = urlUtil.parse(url)

    const optsRequest = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.path,
      port: parsedUrl.port
    }

    const req = getProtocolPkg(url).get(optsRequest, (res) => {
      if (res.statusCode !== 200) {
        resolve({
          delay: constants.INVALID_DELAY,
          url
        })
      } else {
        res.on('data', () => {  });

        res.on("end", () => {
          resolve({
            url,
            delay: (new Date() - t1) / 1000.0 // in seconds
          })
        })
      }
    })

    req.on('error', (err) => {
      resolve({
        url,
        delay: constants.INVALID_DELAY
      })
    })
  })
}

module.exports = {
  delayOf,
  getProtocolPkg
}
