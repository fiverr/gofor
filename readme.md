# gofor

[![](https://img.shields.io/npm/v/@fiverr/gofor.svg)](https://www.npmjs.com/package/@fiverr/gofor)
[![](https://img.shields.io/circleci/project/github/fiverr/gofor.svg)](https://circleci.com/gh/fiverr/gofor)
[![](https://badges.greenkeeper.io/fiverr/gofor.svg)](https://greenkeeper.io/)

gofor is a (Gofor) factory interface for a lean fetch decorator that *deep reverse merges* default options.
It means the headers you put in for each request will take precedence, but will supplemented with the defaults.
It's fetch is [a fetch Promise](https://developer.mozilla.org/en/docs/Web/API/Fetch_API)

The index is a factory, returning the wrapped fetch. It is recommended to use the factory method.

## Install
`npm i -S @fiverr/gofor`

## Use
### Instances are usable straight "out of the box"
```js
const {gofor} = require('@fiverr/gofor');
gofor('/page', {headers: {'X-Custom-Header': 'Custom-Value'}})
    .then(...)
    .catch(...);
```

### Get an instance and configure it:
```javascript
const {gofor} = require('@fiverr/gofor');
const defaultHeaders = new Headers();
defaultHeaders.append('X-Requested-With', 'XMLHttpRequest');
defaultHeaders.append('Content-Type', 'application/json; charset=utf-8');
defaultHeaders.append('Accept', 'application/json');

gofor.config({
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
gofor.config({
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

### Each gofor getter creates a new instance
```js
const gofor1 = require('@fiverr/gofor').gofor;
const gofor2 = require('@fiverr/gofor').gofor;

gofor1 === gofor2 // false
```

## Node Runtime
Gofor is designed for the browser, and depends on the fetch API.

In order to use gofor in node, you must have a polyfill for [fetch](https://www.npmjs.com/package/node-fetch)].

```js
const fetch = require('node-fetch');
const {Headers, Request, Response} = fetch;

// Comply with browser environment
Object.assign(global, {fetch, Headers, Request, Response});
```

## Troubleshooting

#### `.entries is not a function`
 `Object.entries` is available in node version >= `7.5.0`,
