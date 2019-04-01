/**
 * @module gofor/node
 * @since 2.0.0
 * @requires gofor
 */

const fetch = require('node-fetch');
const Gofor = require('./browser');

/**
 * @class GoforNode
 * @classdesc Returns a wrapper with a "fetch" method decorator that *reverse merges* default headers
 *
 * @param  {Object|Function} def Either the default headers or a method to be called one time and returns the default headers object
 */
class GoforNode extends Gofor {
    static get gofor() {
        return new GoforNode().fetch;
    }

    get fetcher() {
        return fetch;
    }

    get interfaces() {
        return fetch;
    }
}

module.exports = GoforNode;
