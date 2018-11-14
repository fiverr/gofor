const { defaults } = require('./helpers');

describe('Gofor', () => {
    describe('headers', () => {
        const fetch = global.fetch;
        const Headers = global.Headers;

        afterEach(() => {
            global.Headers = Headers;
            global.fetch = fetch;
        });

        it('When Headers is not available, new values override defaults', () => {
            delete require.cache[require.resolve('..')];
            global.Headers = null;

            const Gofor = require('..');

            let called = false;

            global.fetch = (url, {headers}) => {
                expect(headers['X-Requested-With']).to.equal('fetch');
                called = true;
            };

            const gofor = new Gofor(defaults());
            gofor.fetch('/', {headers: {
                'X-Requested-With': 'fetch'
            }});

            assert(called, 'fetch was called');
        });
    });
});
