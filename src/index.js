/**
 * @module gofor
 * @since 1.0.0
 * @requires iterate
 */

const fetch = require('node-fetch');
const iterate = require('../lib/iterate');

/**
 * Defaults private key.
 * @type {Symbol}
 */
const defaultsKey = Symbol();

/**
 * Get defaults method private key.
 * @type {Symbol}
 */
const getDefaults = Symbol();

/**
 * Defines the defaults' initial values, and the instance's getDefaults method.
 * @param {Function|Object} defaults
 */
function defineDefaults(defaults) {
    if (typeof defaults === 'function') {
        this[defaultsKey] = null;
        this[getDefaults] = () => {
            const res = defaults();

            if (typeof res !== 'object' || res === null) {
                throw new TypeError('Gofor Error: Defaults getter must return an object');
            }

            this.convertHeaders();

            return res;
        };
    } else {
        this[defaultsKey] = defaults;
        this.convertHeaders();
        this[getDefaults] = () => {
            throw new TypeError('Gofor Error: Defaults have already been defined');
        };
    }
}

/**
 * @class Gofor
 * @classdesc Returns a wrapper with a "fetch" method decorator that *reverse merges* default headers
 *
 * @param    {Object|Function} defaults Default options to be used for each request.
 * @classProperty {Function}   gofor a fresh fetcher instance
 * @property {Object}          defaults The default options.
 */
class Gofor {
    constructor(defaults = {}) {
        defineDefaults.call(this, defaults);

        /**
         * fetch wrapper
         * @param  {String} url       Implied by fetch API
         * @param  {Object} options[] Implied by fetch API
         * @return {Promise}          A fetch promise
         */
        this.fetch = (...args) => {
            args[1] = this.mergeOptions(args[1]);

            return fetch(...args);
        };

        this.fetch.config = this.config.bind(this);
    }

    static get gofor() {
        return new Gofor().fetch;
    }

    get defaults() {
        return this[defaultsKey] = this[defaultsKey] || this[getDefaults]();
    }

    set defaults(obj) {
        throw new RangeError('Gofor Error: Modifying a Gofor instance defaults is not allowed');
    }

    /**
     * Merges the provided options with the current ones, preferring the provided options.
     * @param  {Object} [opts] Options to be supplemented with defaults.
     * @return {Object}
     */
    mergeOptions(opts = null) {
        if (!opts) {
            return this.defaults;
        }

        const options = Object.assign({}, this.defaults, opts);

        if (this.defaults.headers && opts.headers) {
            const headers = this.toHeaders(opts.headers);

            options.headers = this.mergeHeaders(headers);
        }

        return options;
    }

    /**
     * Modify the default options
     * @param {Object} opts The new options to set.
     * no return value
     */
    config(opts = null) {
        defineDefaults.call(this, opts);
    }

    /**
     * Convert self's literal headers to Headers when applicable
     * no return value
     */
    convertHeaders() {
        if (this[defaultsKey] && this[defaultsKey].headers) {
            this[defaultsKey].headers = this.toHeaders(this[defaultsKey].headers);
        }
    }

    /**
     * Converts a headers object to a Headers instance.
     * @param  {Object}  headers
     * @return {Headers}
     */
    toHeaders(headers) {
        const { Headers } = fetch;
        if (headers && typeof headers === 'object' && Headers && !(headers instanceof Headers)) {
            const result = new Headers();

            Object.keys(headers).forEach(
                (key) => result.append(key, headers[key])
            );

            return result;
        }

        return headers;
    }

    /**
     * Merges the provided headers with the default headers, preferring the provided over the defaults.
     * @param  {Object|Headers} submitted
     * @return {Headers}
     */
    mergeHeaders(submitted) {
        const defaults = this.defaults.headers;
        const { Headers } = fetch;
        const headers = new Headers();
        const keys = [];

        submitted && iterate(submitted, (key, value) => {
            headers.append(key, value);
            keys.push(key.toLowerCase());
        });

        defaults && iterate(defaults, (key, value) => {
            keys.includes(key.toLowerCase()) || headers.append(key, value);
        });

        return headers;
    }
}

module.exports = Gofor;
