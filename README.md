# closest-http-endpoint

[![NPM](https://nodei.co/npm/closest-http-endpoint.png)](https://nodei.co/npm/closest-http-endpoint/)

[![Build status](https://travis-ci.org/martinlevesque/closest-http-endpoint.svg?branch=master)](https://travis-ci.org/martinlevesque/closest-http-endpoint)

This package allows to find the closest HTTP/HTTPS endpoint given an array of URLs.
This can be useful to find for instance which server (HTTP-based) is the closest without
complex verification.

## Installation

```
npm install closest-http-endpoint
```

## Usage Example

```
const closestHttpEndpoint = require("closest-http-endpoint")(options)

async function yourfunction() {
  const result = await closestHttpEndpoint(["http://myurl.com/", "https://google.com/"])

  // result will equal to either http://myurl.com/ or https://google.com/
}
```

## Options

Currently available options are the following:

```
{
  timeoutRequest: 10 // 10 seconds maximum timeout
}
```

## License

ISC
