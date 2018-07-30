const mergeHeaders = require('./');
const parseHeaders = require('../parse-headers');

describe('mergeHeaders', () => {
    it('Returns a Headers instance', () => {
        const submitted = new Headers();
        const defaults = new Headers();

        expect(mergeHeaders(submitted, defaults).constructor.name).to.equal(Headers.name);
    });

    it('combines the header items', () => {
        const submitted = new Headers();
        submitted.append('key1', '1');
        submitted.append('key2', '2');

        const defaults = new Headers();
        defaults.append('key3', '3');
        defaults.append('key4', '4');

        const keys = parseHeaders(mergeHeaders(submitted, defaults))
            .map((item) => Object.keys(item)[0]);

        expect(keys).to.deep.equal(['key1', 'key2', 'key3', 'key4']);
    });

    it('merges identical keys from both headers', () => {
        const submitted = new Headers();
        submitted.append('key1', '1');
        submitted.append('key2', '2');

        const defaults = new Headers();
        defaults.append('key1', '3');
        defaults.append('key2', '4');

        const keys = parseHeaders(mergeHeaders(submitted, defaults))
            .map((item) => Object.keys(item)[0]);

        expect(keys).to.deep.equal(['key1', 'key2']);
    });

    it('Does not merge keys\' values. Submitted run over defaults', () => {
        const submitted = new Headers();
        submitted.append('key1', '1');
        submitted.append('key2', '2');

        const defaults = new Headers();
        defaults.append('key1', '3');
        defaults.append('key2', '4');

        const values = parseHeaders(mergeHeaders(submitted, defaults))
            .map((item) => Object.values(item)[0]);

        expect(values).to.deep.equal(['1', '2']);
    });

    it('is case insensitive', () => {
        const submitted = new Headers();
        submitted.append('KEy1', '1');

        const defaults = new Headers();
        defaults.append('keY1', '3');

        const values = parseHeaders(mergeHeaders(submitted, defaults))
            .map((item) => Object.values(item)[0]);

        expect(values).to.deep.equal(['1']);
    });
});
