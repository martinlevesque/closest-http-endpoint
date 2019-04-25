
const https = require("https")
const http = require("http")
const urlUtil = require("url")

const MAX_DELAY = 10000
const TIMEOUT_REQUEST = 3 // seconds

function getProtocolPkg(url) {
  if (url && url.includes(`https:`)) {
    return https
  }

  return http
}

function delayOf(url) {
  const t1 = new Date()

  return new Promise((resolve, reject) => {
    const parsedUrl = urlUtil.parse(url)

    const opts = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.path,
      port: parsedUrl.port,
      timeout: TIMEOUT_REQUEST * 1000
    }

    const req = getProtocolPkg(url).get(opts, (res) => {
      if (res.statusCode !== 200) {
        resolve({
          delay: MAX_DELAY,
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
        delay: MAX_DELAY
      })
    })
  })
}

module.exports = {
  delayOf,
  getProtocolPkg,
  MAX_DELAY
}
