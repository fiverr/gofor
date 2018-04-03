/**
 * @module toHeaders
 * @private
 * @since 1.1.1
 */

/**
 * Global constructor Headers exists
 * @type {Boolean}
 */
let supported;

/**
 * Return a cached result - Global constructor Headers exists
 * @return {Boolean}
 */
module.exports = () => supported = typeof supported === 'boolean' ? supported : typeof Headers === 'function';
