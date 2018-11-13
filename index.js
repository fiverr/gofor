/**
 * @module index (goforFactory)
 * @since 1.0.0
 * @requires gofor
 */

const Gofor = require('gofor');

/**
 * Gofor factory creates a Gofor instance with defaults (or defaults getter) and returns it's wrapper fetch function
 * @param  {Object|Function} def[] See Gofor constructor interface
 * @return {fetch} A wrapper Gofor fetch
 */
module.exports = (...args) => new Gofor(...args).fetch;
Object.defineProperties(
    module.exports,
    {
        fetch: { get: () => Gofor.gofor },
        gofor: { get: () => Gofor.gofor }
    }
);
