'use strict';

const app = {};

function home(Sugar, Suggestion) {
    function onType(text) {
        return new Promise(function(resolve) {
            setTimeout(function() {
                resolve([new Suggestion('avocado'), new Suggestion('broccoli')]);
            }, 300);
        });
    }

    function onSelect(suggestion) {
        console.log(suggestion);
    }

    const sugar = new Sugar(document.getElementById('sugar_container'), onType, onSelect, [new Suggestion('one'), new Suggestion('two')]);
}

document.addEventListener("DOMContentLoaded", function() {
    home(
        app.sugar.Sugar,
        app.sugar.Suggestion
    );
});