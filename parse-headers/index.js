/**
 * @module parseHeaders
 * @private
 * @since 1.1.0
 *
 * Currently being used in test environment only
 */

/**
 * Convert Headers to object
 * @param  {Headers} headers
 * @return {Array<Object>} Array of key-value pairs
 */
module.exports = function parseHeaders(headers = new Headers()) {
    if (!(headers instanceof Headers)) {
        throw new TypeError(`parseHeaders expected an instance of Headers but instead got a ${headers.constructor}`);
    }

    const collection = [];
    const entries = headers.entries();
    let pair;

    while (pair = entries.next().value) { // eslint-disable-line no-cond-assign
        const [key, value] = pair;

        collection.push({[key]: value});
    }

    return collection;
};
