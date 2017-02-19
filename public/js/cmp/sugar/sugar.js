'use strict';

(function(scion, prop, Handlebars) {
    /**
     * @param {HTMLElement} container
     * @param {function(string, function)} onType
     * @param {function(Food)} onSelect
     * @constructor
     */
    function Sugar(container, onType, onSelect) {
        const root = document.createElement('div');
        root.className += 'cmp sugar cmp-root';

        root.innerHTML = `
            <input type="text" />
            <div class="cmp sugar suggestions"></div>
        `;

        const suggestionContainer = root.querySelector('.suggestions');

        this.data = prop({
            selectedIndex: -1,
            suggestions: []
        });

        this.data.on((newData, oldData) => {
            var d = this.data();
            var template = `
                <ul>
                    {{#each suggestions}}
                    <li{{#if selected}} class="selected"{{/if}}>{{text}}</li>
                    {{/each}}
                </ul>`;
            let HTMLString = Handlebars.compile(template)({ suggestions: d.suggestions });
            suggestionContainer.innerHTML = HTMLString;
        });

        let input = root.querySelector('input');

        input.addEventListener('focus', () => {
            sc.gen('select');
        });

        input.addEventListener('input', e => {
            if(e.target.value) sc.gen('type', e.target.value);
            else sc.gen('clear');
        });

        input.addEventListener('keydown', e => {
            const selectedIndex = this.data().selectedIndex;

            if(e.key === 'ArrowUp') {
                selectedIndex === 1 ? sc.gen('bore', Direction.UP) : sc.gen('excite', Direction.DOWN);
            }
            else if(e.key === 'ArrowDown') {
                selectedIndex === this.data().suggestions.length - 1 ?
                    sc.gen('bore',   Direction.DOWN) :
                    sc.gen('excite', Direction.UP);
            }

            if(e.key === 'Enter') {
                sc.gen('choose');
            }
        });

        container.appendChild(root);

        var actions = {
            loading: {
                entry: ev => {
                    let suggestionsPromise = onType(ev.data);

                    suggestionsPromise.then(function(suggestions) {
                        sc.gen('load', suggestions);
                    });
                }
            },
            typing: {
                entry: ev => {
                    let d = this.data();
                    d.suggestions = ev.data;
                    this.data(d);
                }
            }
        };

        var states = [
            {
                id: 'blur',
                transitions: [
                    {
                        event: 'select',
                        target: 'hidden'
                    }
                ]
            },
            {
                id: 'focus',
                transitions: [
                    {
                        event: 'unselect',
                        target: 'blur'
                    }
                ],
                states: [
                    {
                        id: 'hidden',
                        transitions: [
                            {
                                event: 'type',
                                target: 'loading'
                            }
                        ]
                    },
                    {
                        id: 'visible',
                        states: [
                            {
                                id: 'loading',
                                onEntry: actions.loading.entry,
                                transitions: [
                                    {
                                        event: 'load',
                                        target: 'typing'
                                    }
                                ]
                            },
                            {
                                id: 'suggesting',
                                states: [
                                    {
                                        id: 'typing',
                                        onEntry: actions.typing.entry
                                    },
                                    {
                                        id: 'excited'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ];

        var sc = new scion.Statechart({ states: states }, { logStatesEnteredAndExited: true });
        sc.start();
    }

    /**
     * @param {Direction} direction
     */
    Sugar.prototype.changeSelection = function(direction) {
        let data = this.data();

        if(direction === Direction.UP) {
            if(data.selectedIndex >= 0) {
                data.selectedIndex--;
                this.data(data);
            }
            else {
                data.selectedIndex = data.suggestions.length - 1;
                this.data(data);
            }
        }
        else {
            if(data.selectedIndex === data.suggestions.length - 1) {
                data.selectedIndex = -1;
                this.data(data);
            }
            else {
                data.selectedIndex++;
                this.data(data);
            }
        }
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

    window.sugar = {
        Sugar: Sugar,
        Suggestion: Suggestion
    };
    
}(scion, bella.prop, Handlebars));
