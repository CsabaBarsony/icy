'use strict';
/* global describe, it, beforeEach, afterEach, expect */

describe('Cat', function() {
    let container,
        claudius,
        body = document.getElementsByTagName('body')[0];

    beforeEach(function() {
        container = document.createElement('div');
        body.appendChild(container);
        claudius = new app.Cat(container, 'Claudius');
    });

    afterEach(function() {
        body.removeChild(container);
    });

    it('should...', function() {
        let input = claudius.container.querySelector('input');
        input.focus();
        expect(claudius.counter).toBe(1);
        let keydownEvent = new KeyboardEvent('keydown', { key: 'x' });
        input.dispatchEvent(keydownEvent);
        expect(claudius.counter).toBe(2);
    });
    
    it('x', function() {
        expect(1).toBe(1);
    })
});
