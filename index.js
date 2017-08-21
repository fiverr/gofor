/**
 * @module index (goforFactory)
 * @since 1.0.0
 */

const Gofor = require('./gofor');

/**
 * Gofor factory creates a Gofor instance with defaults (or defaults getter) and returns it's wrapper fetch function
 * @param  {Object|Function} def[] See Gofor constructor interface
 * @return {fetch} A wrapper Gofor fetch
 */
module.exports = (...args) => {
    const instance = new Gofor(...args);

    return instance.fetch.bind(instance);
};
