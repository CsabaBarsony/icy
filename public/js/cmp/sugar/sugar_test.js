'use strict';
/* global describe, it, beforeEach, afterEach, expect */

describe('Sugar', function() {
    let container = document.getElementById('container');

    beforeEach(function(done) {
        let sugarInstance = new cmp.sugar.Sugar(
            container,
            function() {
                return new Promise(function(resolve) {
                    setTimeout(function() {
                        resolve([{ text: 'avocado' }, { text: 'ave caesar' }, { text: 'broccoli' }]);
                        done();
                    }, 0);
                });
            },
            function(suggestion) { console.log(suggestion); }
        );
        let input = container.querySelector('input');

        input.focus();
        input.value = 'av';
        input.dispatchEvent(new KeyboardEvent('input'));
    });

    afterEach(function() {
        container.innerHTML = '';
    });

    it('should', function(done) {
        setTimeout(function() {
            expect(container.querySelectorAll('li').length).toBe(2);
            done();
        }, 0);
    });
});
