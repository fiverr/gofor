const defaults = {
    credentials: 'same-origin',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-Custom-Authentication': 'CUSTOM_VALUE',
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json'
    }
};

const catcher = (error) => {
    console.warn(`${error.name} (${error.code}): ${error.message}`);
    return new Promise((res) => res());
};

const goforFactory = require('./');

describe('goforFactory', () => {
    const gofor = goforFactory(() => defaults);

    it('function exists', () => assert.typeOf(gofor, 'function'));
    it('returns a promise', () => assert.instanceOf(gofor('https://www.fiverr.com').catch(catcher), Promise));
    it('Shoots a fetch request', (done) => {
        gofor('https://www.fiverr.com')
            .then((res) => {
                assert.include(res.url, 'https://www.fiverr.com');
                done();
            }).catch((error) => {
                catcher(error);
                done();
            });
    });
});

describe('gofor instance', () => {
    it('creates new instanced of gofor', () => {
        const {gofor} = require('.');
        const gofor2 = require('.').gofor;

        expect(gofor2).to.not.equal(gofor);
    });
});
