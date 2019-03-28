# gofor [![](https://img.shields.io/npm/v/gofor.svg)](https://www.npmjs.com/package/gofor) [![](https://img.shields.io/circleci/project/github/fiverr/gofor.svg)](https://circleci.com/gh/fiverr/gofor)

Each Gofor instance exposes a fetch method: a lean, isomorphic [fetch decorator](https://developer.mozilla.org/en/docs/Web/API/Fetch_API) that *deep reverse merges* default options.

Options you pass through in for each request will take precedence, but will supplemented with the defaults.

- [Installation](#installation)
- [Usage](#usage)
    - [Using the `Gofor` class](#using-the-gofor-class)
    - ["Out of the box" usability with instances](#out-of-the-box-usability-with-instances)
    - [Configuring an instance](#configuring-an-instance)
        - [Setting `Headers`](#setting-headers)
        - [Delayed configuration](#delayed-configuration)
- [FAQ](#faq)
    - [How do I migrate from version 2 to version 3?](#how-do-I-migrate-from-version-2-to-version-3)

## Installation
```
npm i gofor
```

## Usage

### Using the `Gofor` class
```js
const Gofor = require('gofor');
const myGofor = new Gofor({headers: {'X-Custom-Header': 'Custom-Value'}});

myGofor.fetch('/page')
    .then(...)
    .catch(...);
```

### "Out of the box" usability with instances
You can opt to import the `gofor` property to get a working instance with the default environment `Headers`:

```js
const { gofor } = require('gofor');

gofor('/page').then(...); // This is the fetch
```

Each call to `Gofor.gofor` generates a new instance:

```js
const gofor1 = require('gofor').gofor;
const gofor2 = require('gofor').gofor;

gofor1 === gofor2 // false
```

### Configuring an instance
```js
const { gofor } = require('gofor');
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

#### Setting `Headers`

`Gofor` supports setting headers either as an object literal or as a `Headers` instance
**Default header keys will be run over if matched by passed in header keys**. Other keys will be merged. This is made by design.

##### Example
```js
// Configure using the "Headers" constructor

gofor.config({
    credentials: 'same-origin',
    headers: new Headers({
        'Content-Type': 'application/json; charset=utf-8',
        'X-Custom-Header': 'Custom-Value'
    })
});

// Or, using an object literal

gofor.config({
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-Custom-Header': 'Custom-Value'
    }
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

#### Delayed configuration
The function will be called once on first use, and its result will be memoised. useful for cases where you need to pull information from the document and don't want to create a race condition.

```js
const { gofor } = require('gofor');

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

## FAQ

### How do I migrate from version 2 to version 3?

The two breaking changes in version 3 are:
- Deprecation of the server entry (`gofor/server`) in favor of a truly isomorphic solution.
- Deprecation of the `dist` folder.
