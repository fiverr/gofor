const parseHeaders = require('./');

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
        const headers = new Headers();
        headers.append('a', '1');
        headers.append('a', '2');

        expect(parseHeaders(headers)).to.satisfy(
            (res) => res[0]['a']
                .split(',')
                .map(i => i.trim())
                .join(',') === '1,2'
        );
    });
});
