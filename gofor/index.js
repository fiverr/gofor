/**
 * @module gofor
 * @since 1.0.0
 * @requires iterate
 */

/**
 * defaults symbol to be used as a private member
 * @type {Symbol}
 */
const defaults = typeof Symbol === 'function' ? Symbol() : '_defaults';

const iterate = require('../lib/iterate');

/**
 * @class Gofor
 * @classdesc Returns a wrapper with a "fetch" method decorator that *reverse merges* default headers
 *
 * @param  {Object|Function} def Either the default headers or a method to be called one time and returns the default headers object
 */
module.exports = class Gofor {
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
        const { Headers } = this.interfaces;

        return typeof Headers === 'function' && Headers.prototype && typeof Headers.prototype.entries === 'function';
    }

    /**
     * @member defaults
     * @type {Object} Default headers
     * @readonly
     */
    get defaults() {
        this[defaults] = this[defaults] || this.getDefaults();

        return this[defaults];
    }

    set defaults(obj) {
        throw new RangeError('Gofor Error: Modifying a Gofor instance defaults is not allowed');
    }

    defineDefaults(defaults) {
        if (typeof defaults === 'function') {
            this[defaults] = null;
            this.getDefaults = () => {
                const res = defaults();

                if (typeof res !== 'object' || res === null) {
                    throw new TypeError('Gofor Error: Defaults getter must return an object');
                }

                this.convertHeaders();

                return res;
            };
        } else {
            this[defaults] = defaults;
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
        this[defaults] = this.setOptions(opts);

        return this[defaults];
    }

    /**
     * Convert self's literal headers to Headers when applicable
     * no return value
     */
    convertHeaders() {
        if (this[defaults] && this[defaults].headers) {
            this[defaults].headers = this.toHeaders(this[defaults].headers);
        }
    }

    toHeaders(headers) {
        const { Headers } = this.interfaces;

        if (headers && typeof headers === 'object' && this.supportsHeaders && !(headers instanceof Headers)) {
            const result = new Headers();

            Object.keys(headers).forEach(
                (key) => result.append(key, headers[key])
            );

            return result;
        }

        return headers;
    }

    mergeHeaders(submitted) {
        const { Headers } = this.interfaces;
        const defaults = this.defaults.headers;

        if (!this.supportsHeaders) {
            return Object.assign({}, defaults, submitted);
        }

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
};
