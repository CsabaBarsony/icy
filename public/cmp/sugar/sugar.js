'use strict';

(function(app, scion, prop, Handlebars) {
    /**
     * @param {HTMLElement} container
     * @param {Suggestion[]} [suggestions]
     * @constructor
     */
    function Sugar(container, suggestions) {
        this.text = '';
        this.root = document.createElement('div');
        this.root.className += 'cmp';
        this.root.className += ' sugar';
        this.root.innerHTML = `
            <input type="text" />
            <div class="sugar-suggestions"></div>
        `;
        let input = this.root.querySelector('input');
        input.addEventListener('focus', e => {
            console.log('focus', e);
        });
        input.addEventListener('input', e => {
            console.log('input', e);
        });
        input.addEventListener('keydown', e => {
            console.log('keydown', e);
            this.text = e.key;
        });
        this.data = prop({
            selectedIndex: -1,
            suggestions: suggestions
        });
        this.data.on((data) => {
            this.render(data);
        });
        container.appendChild(this.root);
    }

    Sugar.prototype.render = function(data) {
        
    };

    /**
     * @param {string} text
     * @param {Object} [data]
     * @constructor
     */
    function Suggestion(text, data = {}) {
        this.text = text;
        this.data = data;
    }

    /**
     * @enum {string}
     */
    var Direction = {
        UP:   'up',
        DOWN: 'down'
    };

    app.sugar = {
        Sugar:      Sugar,
        Suggestion: Suggestion,
        Direction:  Direction
    };
}(app, scion, bella.prop, Handlebars));
