# gofor

[![npm](https://img.shields.io/npm/v/@fiverr/gofor.svg)](https://www.npmjs.com/package/@fiverr/gofor)
[![CircleCI](https://img.shields.io/circleci/project/github/fiverr/gofor.svg)](https://circleci.com/gh/fiverr/gofor)
[![GitHub issues](https://img.shields.io/github/issues/fiverr/gofor.svg)](https://github.com/fiverr/gofor/issues)

gofor is a (Gofor) factory interface for a lean fetch decorator that *deep reverse merges* default options.
It means the headers you put in for each request will take precedence, but will supplemented with the defaults.
It's fetch is [a fetch Promise](https://developer.mozilla.org/en/docs/Web/API/Fetch_API)

The index is a factory, returning the wrapped fetch. It is recommended to use the factory method.

## Install
`npm i -S @fiverr/gofor`

## Use
### Create an instance:
```javascript
const goforFactory = require('@fiverr/gofor');
const defaultHeaders = new Headers();
defaultHeaders.append('X-Requested-With', 'XMLHttpRequest');
defaultHeaders.append('Content-Type', 'application/json; charset=utf-8');
defaultHeaders.append('Accept', 'application/json');

const gofor = goforFactory({
    credentials: 'same-origin',
    headers: defaultHeaders
});

// Use only defaults
gofor('https://www.website.com').then(...);

// Add/Apply other options
gofor('/page', {
    headers: {
        'X-Custom-Header': 'Custom-Value'
    }
}).then(...);
```

### Supports headers as object literals or Headers instances
**Default header keys will be run over if matched by passed in header keys**. Other keys will be merged. This is made by design.

##### Example
```js
const gofor = goforFactory({
    credentials: 'same-origin',
    headers: new Headers({
        'Content-Type': 'application/json; charset=utf-8',
        'X-Custom-Header': 'Custom-Value'
    })
});

gofor('/page', {
    headers: new Headers({
        'Content-Type': 'text/plain',
    })
});
```
Final headers will be:
```js
    'Content-Type': 'text/plain',
    'X-Custom-Header': 'Custom-Value'
```

## Node Runtime
Gofor is designed for the browser, and depends on the fetch API.

In order to use gofor in node, you must have a polyfill for [fetch](https://www.npmjs.com/package/node-fetch)].

```js
const fetch = require('node-fetch');

// Comply with browser environment, add Headers, Request, Response
Object.assign(global, {fetch}, fetch);
```

## Troubleshooting

#### `.entries is not a function`
 `Object.entries` is available in node version >= `7.5.0`,

[![Greenkeeper badge](https://badges.greenkeeper.io/fiverr/gofor.svg)](https://greenkeeper.io/)
[![bitHound Overall Score](https://www.bithound.io/github/fiverr/gofor/badges/score.svg)](https://www.bithound.io/github/fiverr/gofor)
[![bitHound Dependencies](https://www.bithound.io/github/fiverr/gofor/badges/dependencies.svg)](https://www.bithound.io/github/fiverr/gofor/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/fiverr/gofor/badges/devDependencies.svg)](https://www.bithound.io/github/fiverr/gofor/master/dependencies/npm)
