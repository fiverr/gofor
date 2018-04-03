/**
 * @module toHeaders
 * @private
 * @since 1.1.0
 */

const supportsHeaders = require('../supports-headers');

/**
 * Convert object literal representation of headers to a Headers instance. Return everything else as is
 * @param  {Object|Headers|Any} headers A Headers instance or object literal representation of it
 * @return {Headers|Any}
 */
module.exports = (headers) => {
    if (headers && typeof headers === 'object' && headers !== null && supportsHeaders() && !(headers instanceof Headers)) {
        const result = new Headers();

        Object.keys(headers).forEach(
            (key) => result.append(key, headers[key])
        );

        return result;
    }

    return headers;
};
