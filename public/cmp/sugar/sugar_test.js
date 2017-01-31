'use strict';
/* global describe, xdescribe, it, beforeEach, afterEach, expect, app */

describe('Sugar practical way', function() {
    const Sugar = app.sugar.Sugar,
          Suggestion = app.sugar.Suggestion;

    let container = document.getElementById('container'),
        instance,
        input;

    describe('simulate user activity', function() {
        let onType,
            sugar,
            input,
            suggestField;

        function onSelect(suggestion) {
            console.log(suggestion);
        }

        beforeEach(function(done) {
            onType = function (text) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([new Suggestion('avocado'), new Suggestion('broccoli')]);
                        done();
                    }, 0);
                });
            };

            sugar = new Sugar(document.getElementById('container'), onType, onSelect, [new Suggestion('one'), new Suggestion('two')]);
            input = container.querySelector('input');
            suggestField = container.querySelector('.suggestions');
            input.focus();
            input.value = 'majom';
            input.dispatchEvent(new KeyboardEvent('input'));
        });

        it('type', function(done) {
            setTimeout(function() {
                let listElements = suggestField.querySelectorAll('li');
                expect(listElements.length).toBe(2);
                done();
            }, 0);
        });
    });
});
