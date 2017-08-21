/**
 * @module gofor
 * @since 1.0.0
 */

const deepassign = require('@fiverr/futile/lib/deepassign');

/**
 * defaults symbol to be used as a private member
 * @type {Symbol}
 */
const defaults = typeof Symbol === 'function' ? Symbol() : '_defaults';

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

        return this[defaults];
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
        return opts ? deepassign(
            {},
            this.defaults,
            opts
        ) : this.defaults;
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
