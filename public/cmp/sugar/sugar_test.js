'use strict';
/* global describe, it, beforeEach, afterEach, expect, app */

describe('Cat', function() {
    let container = document.getElementById('container'),
        instance,
        input;

    beforeEach(function() {
        instance = new app.sugar.Sugar(container);
    });

    afterEach(function() {
        console.log(input.value);
        debugger
        //container.innerHTML = '';
    });

    it('should...', function() {
        input = container.querySelector('input');
        input.focus();
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'x' }));
        console.log(instance.text);
        expect(1).toBe(1);
    });
});
