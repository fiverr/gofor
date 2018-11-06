const Gofor = require('..');

const { defaults } = require('./helpers');

describe('Gofor', () => {
    describe('config', () => {
        const gofor = new Gofor(() => defaults());
        const {fetch} = gofor;

        it('Should modify the defaults', () => {
            const headers = new Headers();
            headers.append('Content-Type', 'text-plain');

            fetch.config({headers});

            const options = gofor.defaults;
            assert.equal(options.headers.get('Content-Type'), 'text-plain');
            assert.equal(options.headers.get('X-Custom-Authentication'), defaults().headers['X-Custom-Authentication']);
            assert.equal(options.headers.get('X-Requested-With'), 'XMLHttpRequest');
        });
    });
});
