# gofor

gofor is a (Gofor) factory interface for a lean fetch decorator that *deep reverse merges* default options.
It means the headers you put in for each request will take precedence, but will supplemented with the defaults.
It's fetch is [a fetch Promise](https://developer.mozilla.org/en/docs/Web/API/Fetch_API)

The index is a factory, returning the wrapped fetch. It is recommended to use the factory method.

## Use
### Create an instance:
```javascript
const goforFactory = require('@fiverr/gofor');

const gofor = goforFactory({
    credentials: 'same-origin',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json'
    }
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

## Install
`npm i @fiverr/gofor`
