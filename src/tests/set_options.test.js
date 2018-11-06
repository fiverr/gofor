const Gofor = require('..');

const { defaults } = require('./helpers');

describe('Gofor', () => {
    describe('setOptions', () => {
        let gofor;

        beforeEach(() => {
            gofor = new Gofor(() => defaults());
        });

        it('applies default headers when none are supplied', () => {
            assert.deepEqual(gofor.defaults, defaults());
        });

        it('prefers passed in values, and assigns defaults to others', () => {
            const headers = new Headers();
            const passedKey = 'Content-Type';
            const passedValue = 'text-plain';
            headers.append(passedKey, passedValue);

            const options = gofor.setOptions({headers});
            assert.equal(
                options.headers.get(passedKey),
                passedValue
            );

            [
                'X-Custom-Authentication',
                'X-Requested-With'
            ].forEach((value) => {
                assert.equal(
                    options.headers.get(value),
                    defaults().headers[value]
                );
            });
        });
    });
});
