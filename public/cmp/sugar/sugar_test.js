'use strict';
/* global describe, xdescribe, it, beforeEach, afterEach, expect, app */

describe('Sugar', function() {
    const Sugar = app.sugar.Sugar,
          Suggestion = app.sugar.Suggestion;

    let container = document.getElementById('container'),
        input;

    describe('type', function() {
        let sugar,
            input,
            suggestField;

        beforeEach(function(done) {
            function onType (text) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([new Suggestion('avocado'), new Suggestion('broccoli')]);
                        done();
                    }, 0);
                });
            }

            function onSelect(suggestion) {
                console.log(suggestion);
            }

            sugar = new Sugar(document.getElementById('container'), onType, onSelect, [new Suggestion('one'), new Suggestion('two')]);
            input = container.querySelector('input');
            suggestField = container.querySelector('.suggestions');
            input.focus();
            input.value = 'majom';
            input.dispatchEvent(new KeyboardEvent('input'));
        });

        afterEach(function() {
            container.innerHTML = '';
        });

        it('should display 2 suggestions', function(done) {
            setTimeout(function() {
                let listElements = suggestField.querySelectorAll('li');
                expect(listElements.length).toBe(2);
                expect(listElements[0].textContent).toBe('avocado');
                expect(listElements[1].textContent).toBe('broccoli');
                done();
            }, 0);
        });
    });
});
