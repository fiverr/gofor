const fetch = require('node-fetch');

Object.assign(global,
    require('chai'),
    fetch,
    { fetch }
);

global.window = {};
Object.assign(global.window,
    fetch,
    {
        fetch: fetch.bind(global.window)
    }
);
