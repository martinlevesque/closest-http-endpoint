
const https = require("https")
const http = require("http")
const urlUtil = require("url")

const INVALID_DELAY = 10000
const DEFAULT_TIMEOUT_REQUEST = 3 // seconds

function getProtocolPkg(url) {
  if (url && url.includes(`https:`)) {
    return https
  }

  return http
}

function delayOf(url, opts = {}) {
  const t1 = new Date()

  if ( ! opts.timeoutRequest) {
    opts.timeoutRequest = DEFAULT_TIMEOUT_REQUEST
  }

  return new Promise((resolve, reject) => {
    const parsedUrl = urlUtil.parse(url)

    const optsRequest = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.path,
      port: parsedUrl.port,
      timeout: opts.timeoutRequest * 1000 // convert in ms
    }

    const req = getProtocolPkg(url).get(optsRequest, (res) => {
      if (res.statusCode !== 200) {
        resolve({
          delay: INVALID_DELAY,
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
        delay: INVALID_DELAY
      })
    })
  })
}

module.exports = {
  delayOf,
  getProtocolPkg,
  INVALID_DELAY
}
