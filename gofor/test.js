const { assert } = require('chai');
global.fetch = require('node-fetch');
global.Headers = require('fetch-headers');

const Gofor = require('./');

const defaults = {
    credentials: 'same-origin',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-Custom-Authentication': 'CUSTOM_VALUE',
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json'
    }
};

describe('Gofor/defaults', () => {
    it('defaults default to an empty object', () => {
        const gofor = new Gofor();
        assert.deepEqual(gofor.defaults, {});
    });
    it('set defaults with a method', () => {
        const gofor = new Gofor(() => defaults);
        assert.deepEqual(gofor.defaults, defaults);
    });
    it('set defaults with an object', () => {
        const gofor = new Gofor(defaults);
        assert.deepEqual(gofor.defaults, defaults);
    });
    it('defaults are immutable', () => {
        const gofor = new Gofor(defaults);

        assert.throws(() => {
            gofor.defaults = {a: 1};
        }, RangeError);
        assert.deepEqual(gofor.defaults, defaults);
    });
    it('defaults getter methods must return objects', () => {
        assert.throws(() => (new Gofor(() => null)).fetch('https://www.website.com'), TypeError);
        assert.throws(() => (new Gofor(() => ''  )).fetch('https://www.website.com'), TypeError);
    });
});

describe('Gofor/headers', () => {
    it('converts headers passed in as objects to Headers', () => {
        const gofor = new Gofor(defaults);

        assert(gofor.defaults.headers instanceof Headers);
        assert.equal(gofor.defaults.headers.constructor.name, Headers.name);
    });
});

describe('Gofor/setOptions', () => {
    const gofor = new Gofor(() => defaults);

    it('applies default headers when none are supplied', () => {
        assert.deepEqual(gofor.defaults, defaults);
    });

    it('prefers passed in values, and assigns defaults to others', () => {
        const headers = new Headers();
        headers.append('Content-Type', 'text-plain');

        const options = gofor.setOptions({headers});
        assert.equal(options.headers.get('Content-Type'), 'text-plain');
        assert.equal(options.headers.get('X-Custom-Authentication'), defaults.headers.get('X-Custom-Authentication'));
        assert.equal(options.headers.get('X-Requested-With'), 'XMLHttpRequest');
    });
});
