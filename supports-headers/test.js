const supportsHeaders = require('./');

describe('supportsHeaders', () => {
    const Headers = global.Headers;
    afterEach(() => {
        global.Headers = Headers;
    });

    it('caches the result', () => {
        assert(supportsHeaders, 'Headers are supported');
        delete global.Headers;
        assert(supportsHeaders(), 'Thinks that Headers are still supported');
    });

    it('Does not convert headers when Headers is unavailable', () => {
        delete require.cache[require.resolve('.')];
        delete global.Headers;

        const supportsHeaders = require('./');

        assert(!supportsHeaders(), 'Headers are not supported');
    });
});
