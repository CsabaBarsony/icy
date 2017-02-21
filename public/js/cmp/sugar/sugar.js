'use strict';

(function(scion, Handlebars) {
    function Sugar(container, onType, onSelect) {
        container.innerHTML = `
            <input type="text" />
        `;

        this.suggestionContainer = document.createElement('div');
        this.suggestionContainer.className += 'suggestions';

        container.append(this.suggestionContainer);

        this.model = {
            selectedIndex: -1,
            suggestions: []
        };

        let input = container.querySelector('input');

        input.addEventListener('focus', () => {
            sc.gen('select');
        });

        input.addEventListener('input', e => {
            if(e.target.value) sc.gen('type', e.target.value);
            else sc.gen('clear');
        });

        input.addEventListener('keydown', e => {
            if(e.key === 'ArrowUp') {
                this.model.selectedIndex === 1 ? sc.gen('bore', Direction.UP) : sc.gen('excite', Direction.DOWN);
            }
            else if(e.key === 'ArrowDown') {
                this.model.selectedIndex === this.data().suggestions.length - 1 ?
                    sc.gen('bore',   Direction.DOWN) :
                    sc.gen('excite', Direction.UP);
            }

            if(e.key === 'Enter') {
                sc.gen('choose');
            }
        });

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

        this.render();
    }

    Sugar.prototype.render = function() {
        var template = `
                <ul>
                    {{#each suggestions}}
                    <li{{#if selected}} class="selected"{{/if}}>{{text}}</li>
                    {{/each}}
                </ul>`;

        this.suggestionContainer.innerHTML = Handlebars.compile(template)(this.model);
    };

    Sugar.prototype.changeSelection = function(direction) {
        if(direction === Direction.UP) {
            if(data.selectedIndex >= 0) {
                this.model.selectedIndex--;
            }
            else {
                this.model.selectedIndex = data.suggestions.length - 1;
            }
        }
        else {
            if(data.selectedIndex === data.suggestions.length - 1) {
                this.model.selectedIndex = -1;
            }
            else {
                this.model.selectedIndex++;
            }
        }
    };

    function Suggestion(text, data = {}) {
        this.text = text;
        this.data = data;
    }

    var Direction = {
        UP:   'up',
        DOWN: 'down'
    };

    window.cmp = window.cmp || {};

    window.cmp.sugar = {
        Sugar: Sugar,
        Suggestion: Suggestion
    };
    
}(scion, Handlebars));
