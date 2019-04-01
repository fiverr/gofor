const fetch = require('node-fetch');
const GoforNode = require('../server');

describe('Gofor/node', () => {
    const gofor = new GoforNode();

    it('Implements node-fetch as the fetcher utility', () => {
        assert.equal(
            gofor.fetcher,
            fetch
        );
    });

    it('Implements node-fetch interface constructors', () => {
        [
            'Headers',
            'Request',
            'Response'
        ].forEach((constructor) => {
            assert.equal(
                gofor.interfaces[constructor],
                fetch[constructor]
            );
        });
    });
});
