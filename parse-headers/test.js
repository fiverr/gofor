const { assert } = require('chai');
const parseHeaders = require('./');
global.Headers = require('fetch-headers');

describe('parseHeaders', () => {
    it('function exists', () => assert.typeOf(parseHeaders, 'function'));
    it('returns an object', () => assert.typeOf(parseHeaders(), 'object'));

    it('converts Headers to literal object', () => {
        const obj = {a: '1', b: '2'};
        const headers = new Headers();
        headers.append('a', '1');
        headers.append('b', '2');

        assert.deepEqual(parseHeaders(headers), obj);
    });
});
