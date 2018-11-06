exports.defaults = () => ({
    credentials: 'same-origin',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-Custom-Authentication': 'CUSTOM_VALUE',
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json'
    }
});


/**
 * Convert Headers to object
 * @param  {Headers} headers
 * @return {Array<Object>} Array of key-value pairs
 */
exports.parseHeaders = (headers = new Headers()) => {
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
