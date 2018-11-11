const Gofor = require('..');

const { parseHeaders } = require('./helpers');

describe('Gofor', () => {
    describe('mergeHeaders', () => {
        let gofor;

        beforeEach(() => {
            gofor = new Gofor();
        });

        it('Returns a Headers instance', () => {
            const submitted = new Headers();

            expect(gofor.mergeHeaders(submitted).constructor.name).to.equal(Headers.name);
        });

        it('combines the header items', () => {
            gofor = new Gofor({
                headers: {
                    key3: '3',
                    key4: '4'
                }
            });
            const submitted = new Headers();
            submitted.append('key1', '1');
            submitted.append('key2', '2');

            const merged = gofor.mergeHeaders(submitted);

            const keys = parseHeaders(merged)
                .map((item) => Object.keys(item)[0]);

            expect(keys).to.deep.equal(['key1', 'key2', 'key3', 'key4']);
        });

        it('merges identical keys from both headers', () => {
            gofor = new Gofor({
                headers: {
                    key1: '3',
                    key2: '4'
                }
            });
            const submitted = new Headers();
            submitted.append('key1', '1');
            submitted.append('key2', '2');

            const keys = parseHeaders(gofor.mergeHeaders(submitted))
                .map((item) => Object.keys(item)[0]);

            expect(keys).to.deep.equal(['key1', 'key2']);
        });

        it('Does not merge keys\' values. Submitted run over defaults', () => {
            gofor = new Gofor({
                headers: {
                    key1: '3',
                    key2: '4'
                }
            });
            const submitted = new Headers();
            submitted.append('key1', '1');
            submitted.append('key2', '2');

            const values = parseHeaders(gofor.mergeHeaders(submitted))
                .map((item) => Object.values(item)[0]);

            expect(values).to.deep.equal(['1', '2']);
        });

        it('is case insensitive', () => {
            gofor = new Gofor({
                headers: {
                    keY1: '3'
                }
            });
            const submitted = new Headers();
            submitted.append('KEy1', '1');

            const values = parseHeaders(gofor.mergeHeaders(submitted))
                .map((item) => Object.values(item)[0]);

            expect(values).to.deep.equal(['1']);
        });
    });
});
