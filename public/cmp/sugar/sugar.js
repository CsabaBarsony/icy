'use strict';

(function(app, scion, prop, Handlebars) {
    /**
     * @param {HTMLElement} container
     * @param {Suggestion[]} [suggestions]
     * @constructor
     */
    function Sugar(container, suggestions) {
        this.root = document.createElement('div');
        this.root.className += 'cmp sugar cmp-root';

        this.root.innerHTML = `
            <input type="text" />
            <div class="cmp sugar suggestions"></div>
        `;

        let input = this.root.querySelector('input');

        input.addEventListener('focus', () => {
            this.trigger(Event.SELECT);
        });

        input.addEventListener('blur', () => {
            this.trigger(Event.UNSELECT);
        });

        input.addEventListener('input', e => {

        });

        input.addEventListener('keypress', e => {

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

    /**
     * @param {Event} event
     * @param {Object} [data]
     */
    Sugar.prototype.trigger = function(event, data = null) {
        switch(event) {
            case Event.SELECT:
                break;
            case Event.UNSELECT:
                break;
        }
    };

    /**
     * @enum {string}
     */
    const Event = {
        SELECT: 'select',
        UNSELECT: 'unselect',
        TYPE: 'type',
        CLEAR: 'clear',
        LOAD: 'load',
        EXCITE: 'excite',
        BORE: 'bore',
        CHOOSE: 'choose'
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
