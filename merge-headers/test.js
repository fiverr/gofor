const { expect } = require('chai');
const mergeHeaders = require('./');
const parseHeaders = require('../parse-headers');
global.Headers = require('fetch-headers');

describe('mergeHeaders', () => {
    it('Returns a Headers instance', () => {
        const one = new Headers();
        const two = new Headers();

        expect(mergeHeaders(one, two).constructor.name).to.equal(Headers.name);
    });

    it('combines the header items', () => {
        const one = new Headers();
        one.append('key1', '1');
        one.append('key2', '2');

        const two = new Headers();
        two.append('key3', '3');
        two.append('key4', '4');

        const keys = parseHeaders(mergeHeaders(one, two))
            .map(item => Object.keys(item)[0]).join(',');

        expect(keys).to.equal('key1,key2,key3,key4');
    });

    it('merges identical keys from both headers', () => {
        const one = new Headers();
        one.append('key1', '1');
        one.append('key2', '2');

        const two = new Headers();
        two.append('key1', '3');
        two.append('key2', '4');

        const keys = parseHeaders(mergeHeaders(one, two))
            .map(item => Object.keys(item)[0]).join(',');

        expect(keys).to.equal('key1,key2');
    });

    it('merges identical keys\' values', () => {
        const one = new Headers();
        one.append('key1', '1');
        one.append('key2', '2');

        const two = new Headers();
        two.append('key1', '3');
        two.append('key2', '4');

        const values = parseHeaders(mergeHeaders(one, two))
            .map(item => Object.values(item)[0]).join(',');

        expect(values).to.equal('1,3,2,4');
    });
});
