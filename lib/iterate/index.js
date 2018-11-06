/**
 * @module iterate
 * @since 2.0.0
 */

/**
 * An enumerable object.
 * @typedef {(Object|Map)} Iterable
 */

/**
 * Iterate over a given iterator and call a passed (lambda) function on each item.
 * @param  {Iterable} iterator
 * @param  {Function} fn
 * no return value
 */
module.exports = function iterate(iterator, fn) {
    if (!iterator.entries) {
        Object.keys(iterator).forEach((key) => fn(key, iterator[key]));

        return;
    }

    const entries = iterator.entries();
    let pair;

    while (pair = entries.next().value) { // eslint-disable-line no-cond-assign
        fn(...pair);
    }
};
