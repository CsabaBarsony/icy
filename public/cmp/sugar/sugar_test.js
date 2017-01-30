'use strict';
/* global describe, xdescribe, it, beforeEach, afterEach, expect, app */

describe('Sugar', function() {
    let instance;

    beforeEach(function() {
        instance = new app.sugar.Sugar(document.getElementById('container'));
    });

    it('should...', function() {
        instance.focusChange(true);
        instance.inputChange('majom');
        expect(1).toBe(1);
    });
});

xdescribe('Sugar practical way', function() {
    let container = document.getElementById('container'),
        instance,
        input;

    beforeEach(function() {
        instance = new app.sugar.Sugar(container);
    });

    afterEach(function() {
        console.log(input.value);
        //container.innerHTML = '';
    });

    it('should...', function() {
        input = container.querySelector('input');
        input.focus();
        input.dispatchEvent(new KeyboardEvent('keypress', { key: 'x' }));
        expect(1).toBe(1);
    });
});
