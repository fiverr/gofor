/**
 * @module gofor
 * @since 1.0.0
 * @requires iterate
 */

/**
 * defaults symbol to be used as a private member
 * @type {Symbol}
 */
const defaultsKey = typeof Symbol === 'function' ? Symbol() : '_defaults';

const iterate = require('../lib/iterate');

/**
 * @class Gofor
 * @classdesc Returns a wrapper with a "fetch" method decorator that *reverse merges* default headers
 *
 * @param  {Object|Function} def Either the default headers or a method to be called one time and returns the default headers object
 */
class Gofor {
    constructor(defaults = {}) {
        this.defineDefaults(defaults);

        /**
         * fetch wrapper
         * @param  {String} url       Implied by fetch API
         * @param  {Object} options[] Implied by fetch API
         * @return {Promise}          A fetch promise
         */
        this.fetch = (...args) => {
            args[1] = this.setOptions(args[1]);

            return this.fetcher(...args);
        };

        this.fetch.config = this.config.bind(this);
    }

    get fetcher() {
        return fetch;
    }

    get interfaces() {
        return {
            Headers,
            Request,
            Response
        };
    }

    get supportsHeaders() {
        try {
            return this.interfaces.Headers.prototype.entries === 'function';
        } catch (e) {
            return false;
        }
    }

    /**
     * @member defaults
     * @type {Object} Default headers
     * @readonly
     */
    get defaults() {
        return this[defaultsKey] = this[defaultsKey] || this.getDefaults();
    }

    set defaults(obj) {
        throw new RangeError('Gofor Error: Modifying a Gofor instance defaults is not allowed');
    }

    defineDefaults(defaults) {
        if (typeof defaults === 'function') {
            this[defaultsKey] = null;
            this.getDefaults = () => {
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
            this.getDefaults = () => {
                throw new TypeError('Gofor Error: Defaults have already been defined');
            };
        }
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

        if (this.defaults.headers && opts.headers) {
            const headers = this.toHeaders(opts.headers);

            options.headers = this.mergeHeaders(headers);
        }

        return options;
    }

    config(opts = null) {
        this[defaultsKey] = this.setOptions(opts);

        return this[defaultsKey];
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

    toHeaders(headers) {
        if (headers && typeof headers === 'object' && this.supportsHeaders && !(headers instanceof Headers)) {
            const { Headers } = this.interfaces;
            const result = new Headers();

            Object.keys(headers).forEach(
                (key) => result.append(key, headers[key])
            );

            return result;
        }

        return headers;
    }

    mergeHeaders(submitted) {
        const defaults = this.defaults.headers;

        if (!this.supportsHeaders) {
            return Object.assign({}, defaults, submitted);
        }

        const { Headers } = this.interfaces;
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
