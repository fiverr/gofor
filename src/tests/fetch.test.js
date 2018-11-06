const Gofor = require('..');

const { defaults } = require('./helpers');

const catcher = (error) => {
    console.warn(`${error.name} (${error.code}): ${error.message}`);
    return new Promise((res) => res());
};

describe('Gofor', () => {
    describe('Fetch implementation', () => {
        const gofor = new Gofor(defaults());

        it('Returns a promise', () => {
            assert.instanceOf(
                gofor.fetch('https://www.fiverr.com').catch(catcher),
                Promise
            );
        });

        it('Shoots a fetch request', async () => {
            const res = await gofor.fetch('https://www.fiverr.com/dragon');

            assert.match(res.url, /^https:\/\/\w{0,7}\.fiverr\.com/);
        });
    });
});
