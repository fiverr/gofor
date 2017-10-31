/**
 * Convert Headers to object
 * @param  {Iterator|Object} headers
 * @return {Object}
 */
module.exports = function parseHeaders(headers = {}) {
    if (typeof Headers !== 'undefined' && headers instanceof Headers) {

        const collection = {};
        const entries = headers.entries();
        let pair;

        while (pair = entries.next().value) { // eslint-disable-line no-cond-assign
            const [key, value] = pair;

            collection[key] = value;
        }

        return collection;
    }

    return headers;
};
