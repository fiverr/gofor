const fetch = require('node-fetch');

global.window = global;

Object.assign(global,
    require('chai'),
    fetch,
    { fetch }
);
