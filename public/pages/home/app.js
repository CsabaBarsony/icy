'use strict';

const app = {};

function home(Sugar, Suggestion) {
    function onType(text, callback) {
        debugger
        setTimeout(function() {
            callback([new Suggestion('avocado'), new Suggestion('broccoli')]);
        }, 300);
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