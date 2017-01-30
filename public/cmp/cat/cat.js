'use strict';

(function(app) {
    function Cat(container, name) {
        this.container = container;
        this.name = name;
        this.counter = 0;
        
        container.innerHTML = '<input class="cat_input" type="text" />';
        var input = container.querySelector('input');
        input.addEventListener('focus', e => {
            this.counter++;
            console.log('focus event', e);
        });
        input.addEventListener('keydown', e => {
            console.log('keydown', e);
            this.counter++;
        });
    }
    
    app.Cat = Cat;
}(app));
