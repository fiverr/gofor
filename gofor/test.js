const { assert } = require('chai');
global.fetch = require('node-fetch');

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

describe('Gofor/setOptions', () => {
    const gofor = new Gofor(() => defaults);

    it('applies default headers when none are supplied', () => {
        assert.deepEqual(gofor.defaults, defaults);
    });

    it('prefers passed in values, and assigns defaults to others', () => {
        const options = gofor.setOptions({
            headers: {
                'Content-Type': 'text-plain'
            }
        });
        assert.equal(options.headers['Content-Type'], 'text-plain');
        assert.equal(options.headers['X-Custom-Authentication'], defaults.headers['X-Custom-Authentication']);
        assert.equal(options.headers['X-Requested-With'], 'XMLHttpRequest');
    });
});
