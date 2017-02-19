'use strict';

(function (Handlebars, scion) {
    function Candy(container, getText, callback) {
        this.container = container;
        this.getText = getText;
        this.callback = callback;

        const self = this;

        const states = [
            {
                id: 'list',
                transitions: [
                    {
                        target: 'loading',
                        event: 'click'
                    }
                ]
            },
            {
                id: 'loading',
                transitions: [
                    {
                        target: 'list',
                        event: 'load'
                    }
                ],
                onEntry: function() {
                    self.model.loading = true;
                    self.render();
                },
                onExit: function() {
                    self.model.loading = false;
                    self.render();
                }
            }
        ];

        this.sc = new scion.Statechart({ states: states }, { logStatesEnteredAndExited: false });
        this.sc.start();

        this.model = {
            loading: false,
            messages: ['hüje', 'vagy']
        };

        this.render();
    }

    Candy.prototype.render = function() {
        const self = this;
        var template = `
                {{#if loading}}
                <div>loading...</div>
                {{else}}
                <ul>
                    {{#each messages}}
                    <li>{{this}}</li>
                    {{/each}}
                </ul>
                <button class="add_message">Add majom</button>
                {{/if}}
                `;

        this.container.innerHTML = Handlebars.compile(template)(this.model);
        this.container.querySelector('.add_message').addEventListener('click', function() {
            self.sc.gen('click');
            self.getText().then(function(text) {
                self.model.messages.push(text);
                self.callback(self.model.messages);
                self.sc.gen('load');
                self.render();
            });
        });
    };

    window.candy = {
        Candy: Candy
    };
}(Handlebars, scion));
