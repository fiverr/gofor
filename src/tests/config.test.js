const Gofor = require('..');

const { defaults } = require('./helpers');

describe('Gofor', () => {
    describe('config', () => {
        const gofor = new Gofor(() => defaults());
        const {fetch} = gofor;

        it('Should run over the defaults', () => {
            const headers = new Headers();
            headers.append('Content-Type', 'text-plain');

            assert.equal(gofor.defaults.headers['X-Custom-Authentication'], defaults().headers['X-Custom-Authentication']);
            assert.equal(gofor.defaults.headers['X-Requested-With'], 'XMLHttpRequest');

            fetch.config({headers});

            assert.equal(gofor.defaults.headers.get('Content-Type'), 'text-plain');
            assert.equal(gofor.defaults.headers['X-Custom-Authentication'], null);
            assert.equal(gofor.defaults.headers['X-Requested-With'], null);
            assert.equal(gofor.defaults.headers.get('X-Custom-Authentication'), null);
            assert.equal(gofor.defaults.headers.get('X-Requested-With'), null);
        });
    });
});
