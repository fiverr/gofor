const Gofor = require('..');

const { defaults } = require('./helpers');

describe('Gofor', () => {
    describe('defaults', () => {
        it('Defaults to an empty object', () => {
            const gofor = new Gofor();
            assert.deepEqual(gofor.defaults, {});
        });

        it('Set defaults with a method', () => {
            const gofor = new Gofor(() => defaults());
            assert.deepEqual(gofor.defaults, defaults());
        });

        it('Set defaults with an object', () => {
            const gofor = new Gofor(defaults);
            assert.equal(gofor.defaults.credentials, defaults().credentials);
            assert.deepEqual(gofor.defaults.headers, defaults().headers);
        });

        it('Defaults are immutable', () => {
            const gofor = new Gofor(defaults());

            assert.throws(() => {
                gofor.defaults = {a: 1};
            }, RangeError);
        });

        it('Defaults getter methods must return objects', () => {
            assert.throws(() => (new Gofor(() => null)).fetch('https://www.website.com'), TypeError);
            assert.throws(() => (new Gofor(() => '')).fetch('https://www.website.com'), TypeError);
        });
    });
});
