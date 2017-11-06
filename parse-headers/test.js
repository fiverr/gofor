const { assert } = require('chai');
const parseHeaders = require('./');
global.Headers = require('fetch-headers');

describe('parseHeaders', () => {
    it(
        'function exists',
        () => assert.typeOf(parseHeaders, 'function')
    );

    it(
        'returns an array',
        () => assert.typeOf(parseHeaders(), 'array')
    );

    it(
        'accepts only headers',
        () => assert.throws(() => parseHeaders({a: 1}), TypeError, /expected an instance of Headers/)
    );

    it('converts Headers to literal object', () => {
        const list = [
            {a: '1'},
            {b: '2'},
        ];

        const headers = new Headers();
        headers.append('a', '1');
        headers.append('b', '2');

        assert.deepEqual(parseHeaders(headers), list);
    });

    it('Chains identical keys\' values', () => {
        const list = [
            {a: '1,2'},
        ];

        const headers = new Headers();
        headers.append('a', '1');
        headers.append('a', '2');

        assert.deepEqual(parseHeaders(headers), list);
    });
});
