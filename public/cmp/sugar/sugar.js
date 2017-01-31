'use strict';

(function(app, scion, prop, Handlebars) {
    /**
     * @param {HTMLElement} container
     * @param {function(string, function)} onType
     * @param {function(Food)} onSelect
     * @param {Suggestion[]} [suggestions]
     * @constructor
     */
    function Sugar(container, onType, onSelect, suggestions = []) {
        const root = document.createElement('div');
        root.className += 'cmp sugar cmp-root';

        root.innerHTML = `
            <input type="text" />
            <div class="cmp sugar suggestions"></div>
        `;

        const suggestionContainer = root.querySelector('.suggestions');

        this.suggestions = suggestions;

        this.data = prop({
            selectedIndex: -1,
            suggestions: suggestions
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

        container.appendChild(root);

        var actions = {
            blur: {
                entry: () => {
                    console.log('blur entry')
                }
            },
            loading: {
                entry: ev => {
                    console.log('loading entry');
                    let suggestionsPromise = onType(ev.data);

                    suggestionsPromise.then(function(suggestions) {
                        sc.gen('load', suggestions);
                    });
                }
            },
            suggesting: {
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
                onEntry: actions.blur.entry,
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
                                        target: 'suggesting'
                                    }
                                ]
                            },
                            {
                                id: 'suggesting',
                                onEntry: actions.suggesting.entry
                            }
                        ]
                    }
                ]
            }
        ];

        var sc = new scion.Statechart({ states: states }, { logStatesEnteredAndExited: false });
        sc.start();
    }

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
