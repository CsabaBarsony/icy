'use strict';
/* global describe, it, beforeEach, afterEach, expect */

describe('Sugar 2', function() {
    let container = document.getElementById('container');
    let myResolve = null;
    let su = null;

    it('should 2', function(done) {
        let typePromise = new Promise(function(resolve) {
            resolve([{ text: 'avocado' }, { text: 'ave caesar' }]);
            done();
        });

        let onType = function() {
            return new Promise(function(resolve) {
                myResolve = resolve;
            });
        };

        su = new cmp.sugar.Sugar(
            container,
            onType,
            function(suggestion) { console.log(suggestion); },
            { logStatesEnteredAndExited: false }
        );
        let input = container.querySelector('input');

        input.focus();
        input.value = 'av';
        input.dispatchEvent(new KeyboardEvent('input'));

        expect(1).toBe(1);

        myResolve([{ text: 'avocado' }, { text: 'ave caesar' }]);
    });

    it('should 3', function() {
        expect(3).toBe(3);
    });
});

xdescribe('Sugar', function() {
    let container = document.getElementById('container');

    beforeEach(function(done) {
        let sugarInstance = new cmp.sugar.Sugar(
            container,
            function() {
                return new Promise(function(resolve) {
                    setTimeout(function() {
                        resolve([{ text: 'avocado' }, { text: 'ave caesar' }]);
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
