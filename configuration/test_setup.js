const fetch = require('node-fetch');

Object.assign(global,
    require('chai'),
    fetch,
    { fetch }
);
