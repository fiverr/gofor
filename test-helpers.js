Object.assign(global, require('chai'));

global.fetch = require('node-fetch');
global.Headers = global.fetch.Headers;

// while lib is tested on Node 6.x.x
if (!Object.values) {
    Object.values = (obj) => Object.keys(obj).map((key) => obj[key]);
}
