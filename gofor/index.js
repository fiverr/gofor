/**
 * @module gofor
 * @since 1.0.0
 * @requires merge-headers
 */

/**
 * defaults symbol to be used as a private member
 * @type {Symbol}
 */
const defaults = typeof Symbol === 'function' ? Symbol() : '_defaults';

const mergeHeaders = require('../merge-headers');

/**
 * @class Gofor
 * @classdesc Returns a wrapper with a "fetch" method decorator that *reverse merges* default headers
 *
 * @param  {Object|Function} def Either the default headers or a method to be called one time and returns the default headers object
 */
module.exports = class Gofor {
    constructor(def = {}) {
        if (typeof def === 'function') {
            this[defaults] = null;
            this.getDefaults = () => {
                const res = def();

                if (typeof res !== 'object' || res === null) {
                    throw new TypeError('Gofor Error: Defaults getter must return an object');
                }

                return res;
            };
        } else {
            this[defaults] = def;
            this.getDefaults = () => {
                throw new TypeError('Gofor Error: Defaults have already been defined');
            };
        }
    }

    /**
     * @member defaults
     * @type {Object} Default headers
     * @readonly
     */
    get defaults() {
        this[defaults] = this[defaults] || this.getDefaults();

        this.convertHeaders();

        return this[defaults];
    }

    convertHeaders() {
        const headers = this[defaults].headers;

        if (headers && !(headers instanceof Headers)) {
            this[defaults].headers = new Headers();

            Object.keys(headers).forEach(
                (header) => this[defaults].headers.append(header, headers[header])
            );
        }

        return this;
    }

    set defaults(obj) {
        throw new RangeError('Gofor Error: Modifying a Gofor instance defaults is not allowed');
    }

    /**
     * setOptions
     * @param  {Object} opts[] Options to be supplemented with defaults
     * @return {Object} Original options supplemented with defaults
     */
    setOptions(opts = null) {
        if (!opts) {
            return this.defaults;
        }

        const options = Object.assign({}, this.defaults, opts);
        options.headers = opts.headers ? mergeHeaders(opts.headers, this.defaults.headers) : this.defaults.headers;

        return options;
    }

    /**
     * [fetch description]
     * @param  {String} url       Implied by fetch API
     * @param  {Object} options[] Implied by fetch API
     * @return {Promise}          A fetch promise
     */
    fetch(...args) {
        args[1] = this.setOptions(args[1]);

        return fetch(...args);
    }
};
