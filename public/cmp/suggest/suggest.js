'use strict';

(function(app, scion, prop, Handlebars) {
    /**
     * @param {HTMLElement} container
     * @param {function(string, function)} onType
     * @param {function(Food)} onSelect
     * @param {Suggestion[]} [suggestions]
     * @constructor
     */
    function Suggest(container, onType, onSelect, suggestions = []) {
        this.data = prop({
            selectedIndex: -1,
            suggestions: suggestions
        });
        this.data.on((newValue) => {
            this.render(newValue);
        });
        this.container = container;
        var pendingLoadings = 0;
        var actions = {
            visible: {
                entry: function() {
                    suggestField.style.display = 'block';
                },
                exit: function() {
                    suggestField.style.display = 'none';
                }
            },
            loading: {
                entry: function() {
                    pendingLoadings++;
                    suggestField.innerHTML = 'loading...';
                    onType(input.value, function(suggestions) {
                        pendingLoadings--;
                        // TODO: right sequence of callbacks is not guaranteed
                        if(pendingLoadings === 0) sc.gen('load', suggestions);
                    });
                },
                exit: function() {
                    suggestField.innerHTML = '';
                }
            },
            suggesting: {
                entry: (e) => {
                    let data = this.data();
                    data.suggestions = e.data;
                    this.data(data);
                }
            },
            excited: {
                entry: (e) => {
                    this.changeSelection(e.data);
                }
            },
            blur: {
                entry: function() {
                    suggestField.innerHTML = '';
                    suggestField.style.display = 'none';
                }
            },
            chosen: {
                entry: function(e) {
                    onSelect(e.data);
                    input.value = '';
                    suggestField.innerHTML = '';
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
                        target: 'focus'
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
                        onEntry: actions.visible.entry,
                        onExit: actions.visible.exit,
                        states: [
                            {
                                id: 'loading',
                                onEntry: actions.loading.entry,
                                onExit: actions.loading.exit,
                                transitions: [
                                    {
                                        event: 'load',
                                        target: 'typing'
                                    },
                                    {
                                        event: 'clear',
                                        target: 'hidden'
                                    },
                                    {
                                        event: 'type',
                                        target: 'loading'
                                    }
                                ]
                            },
                            {
                                id: 'suggesting',
                                onEntry: actions.suggesting.entry,
                                transitions: [
                                    {
                                        event: 'type',
                                        target: 'loading'
                                    },
                                    {
                                        event: 'clear',
                                        target: 'hidden'
                                    },
                                    {
                                        event: 'choose',
                                        target: 'chosen'
                                    }
                                ],
                                states: [
                                    {
                                        id: 'typing',
                                        transitions: [
                                            {
                                                event: 'excite',
                                                target: 'excited'
                                            }
                                        ]
                                    },
                                    {
                                        id: 'excited',
                                        onEntry: actions.excited.entry,
                                        transitions: [
                                            {
                                                event: 'excite',
                                                target: 'excited'
                                            },
                                            {
                                                event: 'bore',
                                                target: 'typing'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: 'chosen',
                        onEntry: actions.chosen.entry,
                        transitions: [
                            {
                                event: 'type',
                                target: 'loading'
                            }
                        ]
                    }
                ]
            }
        ];

        var sc = new scion.Statechart({ states: states }, { logStatesEnteredAndExited: false });
        sc.start();

        var suggestContainer = document.createElement('div');
        suggestContainer.addEventListener('keydown', (e) => {
            var selected = false;
            this.data().suggestions.forEach((s) => {
                if(s.selected) selected = s;
            });
            if(e.key === 'Enter') {
                sc.gen('choose', selected);
            }
        });
        suggestContainer.className += 'suggest';
        container.appendChild(suggestContainer);

        var input = renderInput(function(e) {
            console.log('focus', e);
            sc.gen('select');
        }, function(e) {
            console.log('blur', e);
            sc.gen('unselect');
        }, function(e) {
            console.log('input', e);
            if(e.target.value === '') {
                sc.gen('clear');
            }
            else {
                sc.gen('type');
            }
        }, function(e) {
            console.log('keydown', e);
            if(e.key === 'ArrowDown') {
                sc.gen('excite', 'down');
            }
            else if(e.key === 'ArrowUp') {
                sc.gen('excite', 'up');
            }
        });

        suggestContainer.appendChild(input);

        var suggestField = renderSuggestField();

        suggestContainer.appendChild(suggestField);
    }

    function renderInput(onFocus, onBlur, onInput, onKeydown) {
        var input = document.createElement('input');
        input.className += 'suggest_input';
        input.onfocus = onFocus;
        input.onblur = onBlur;
        input.addEventListener('input', onInput);
        input.addEventListener('keydown', onKeydown);
        return input;
    }

    function renderSuggestField() {
        var suggestField = document.createElement('div');
        suggestField.className += 'suggest_field';
        suggestField.style.display = 'none';
        return suggestField;
    }

    Suggest.prototype.render = function(data) {
        var suggestField = this.container.querySelector('.suggest_field');
        if(data.suggestions[data.selectedIndex]) data.suggestions[data.selectedIndex].selected = true;
        var template = `
            <ul>
                {{#each suggestions}}
                <li{{#if selected}} class="selected"{{/if}}>{{text}}</li>
                {{/each}}
            </ul>`;
        suggestField.innerHTML = Handlebars.compile(template)({ suggestions: data.suggestions });
    };

    /**
     * @param {Direction} direction
     */
    Suggest.prototype.changeSelection = function(direction) {
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
        UP: 'up',
        DOWN: 'down'
    };

    app.suggest = {
        Suggest: Suggest,
        Suggestion: Suggestion,
        Direction: Direction
    };
}(app, scion, bella.prop, Handlebars));
