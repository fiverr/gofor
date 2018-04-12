const Gofor = require('./');

const defaults = () => ({
    credentials: 'same-origin',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-Custom-Authentication': 'CUSTOM_VALUE',
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json'
    }
});

describe('Gofor/defaults', () => {
    it('defaults default to an empty object', () => {
        const gofor = new Gofor();
        assert.deepEqual(gofor.defaults, {});
    });
    it('set defaults with a method', () => {
        const gofor = new Gofor(() => defaults());
        assert.deepEqual(gofor.defaults, defaults());
    });
    it('set defaults with an object', () => {
        const gofor = new Gofor(defaults);
        assert.equal(gofor.defaults.credentials, defaults().credentials);
        assert.deepEqual(gofor.defaults.headers, defaults().headers);
    });
    it('defaults are immutable', () => {
        const gofor = new Gofor(defaults());

        assert.throws(() => {
            gofor.defaults = {a: 1};
        }, RangeError);
    });
    it('defaults getter methods must return objects', () => {
        assert.throws(() => (new Gofor(() => null)).fetch('https://www.website.com'), TypeError);
        assert.throws(() => (new Gofor(() => ''  )).fetch('https://www.website.com'), TypeError);
    });
});

describe('Gofor/headers', () => {
    const fetch = global.fetch;
    const Headers = global.Headers;

    afterEach(() => {
        global.Headers = Headers;
        global.fetch = fetch;
    });

    it('When Headers is not available, new values override defaults', () => {
        delete require.cache[require.resolve('.')];
        delete require.cache[require.resolve('../to-headers')];
        delete require.cache[require.resolve('../merge-headers')];
        delete require.cache[require.resolve('../supports-headers')];

        delete global.Headers;
        const Gofor = require('./');
        let called = false;

        global.fetch = (url, {headers}) => {
            expect(headers['X-Requested-With']).to.equal('fetch');
            called = true;
        }

        const gofor = new Gofor(defaults());
        gofor.fetch('/', {headers: {
            'X-Requested-With': 'fetch'
        }});

        assert(called, 'fetch was called');
    });
});


describe('Gofor/setOptions', () => {
    const gofor = new Gofor(() => defaults());

    it('applies default headers when none are supplied', () => {
        assert.deepEqual(gofor.defaults, defaults());
    });

    it('prefers passed in values, and assigns defaults to others', () => {
        const headers = new Headers();
        headers.append('Content-Type', 'text-plain');

        const options = gofor.setOptions({headers});
        assert.equal(options.headers.get('Content-Type'), 'text-plain');
        assert.equal(options.headers.get('X-Custom-Authentication'), defaults().headers['X-Custom-Authentication']);
        assert.equal(options.headers.get('X-Requested-With'), 'XMLHttpRequest');
    });
});
