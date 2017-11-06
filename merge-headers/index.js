/**
 * @module mergeHeaders
 * @since 1.1.0
 * @requires parse-headers
 */

const parseHeaders = require('../parse-headers');

/**
 * Merges Headers values
 * @param  {...Headers} headerses
 * @return {Headers}
 */
module.exports = function mergeHeaders(...headerses) {
    const lists = headerses
        .filter((headers) => !!headers)
        .map(parseHeaders);

    const headers = new Headers();

    lists.forEach(
        (list) => {
            list.forEach(
                (item) => {
                    Object.keys(item).forEach(
                        (key) => {
                            headers.append(key, item[key]);
                        }
                    );
                }
            );
        }
    );

    return headers;
};
