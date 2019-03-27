# gofor [![](https://img.shields.io/npm/v/gofor.svg)](https://www.npmjs.com/package/gofor) [![](https://img.shields.io/circleci/project/github/fiverr/gofor.svg)](https://circleci.com/gh/fiverr/gofor)

Each Gofor instance exposes a fetch method: a lean, isomorphic [fetch decorator](https://developer.mozilla.org/en/docs/Web/API/Fetch_API) that *deep reverse merges* default options.

Options you pass through in for each request will take precedence, but will supplemented with the defaults.

## Install
```
npm i gofor
```

## Using the constructor
```js
const Gofor = require('gofor');
const myGofor = new Gofor({headers: {'X-Custom-Header': 'Custom-Value'}});
myGofor.fetch('/page')
    .then(...)
    .catch(...);
```

### "out of the box" usability with instances
```js
const {gofor} = require('gofor');
gofor('/page').then(...); // This is the fetch
gofor.config({headers: {'X-Custom-Header': 'Custom-Value'}});
gofor('/page').then(...); // Now includes default settings
```

### Configuring an instance
```javascript
const {gofor} = require('gofor');
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
const gofor1 = require('gofor').gofor;
const gofor2 = require('gofor').gofor;

gofor1 === gofor2 // false
```

### Delayed configuration
The function will be called once on first use, and its result will be memoised. useful for cases where you need to pull information from the document and don't want to create a race condition.

```js
const {gofor} = require('gofor');

gofor.config(() => ({
    credentials: 'same-origin',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
        'X-Custom-Secret': document.getElementById('secret').value,
    },
}));
```
