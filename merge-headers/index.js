/**
 * @module mergeHeaders
 * @private
 * @since 1.1.0
 */

/**
 * Merge Headers values
 * @param  {...Headers} headerses
 * @return {Headers}
 */
module.exports = function mergeHeaders(submitted, defaults) {
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
};

/**
 * Iterate over the iterator and call a passed (lambda) function
 * @param  {Iterator} iterator
 * @param  {Function} fn
 * no return value
 */
function iterate(iterator, fn) {
    const entries = iterator.entries();
    let pair;

    while (pair = entries.next().value) { // eslint-disable-line no-cond-assign
        fn(...pair);
    }
}
