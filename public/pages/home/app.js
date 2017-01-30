'use strict';

const app = {};

function home(Suggest, Suggestion) {
    var suggestComponent = new Suggest(
        document.getElementById('suggest_container'),
        (text, callback) => {
            setTimeout(function() {
                callback([new Suggestion('avocado'), new Suggestion('broccoli')]);
            }, 300);
        },
        (suggestion) => {
            console.log(suggestion);
        }
    );
}

document.addEventListener("DOMContentLoaded", function() {
    home(
        app.suggest.Suggest,
        app.suggest.Suggestion
    );
});