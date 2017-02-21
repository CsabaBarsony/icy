'use strict';

function calculator(Sugar, Suggestion, Candy) {
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

    const sugar = new Sugar(document.getElementById('sugar_container'), onType, onSelect);
    
    /*const candyInstance = new Candy(
        document.getElementById('candy_container'),
        function() {
            return new Promise(function(resolve) {
                setTimeout(function() {
                    resolve('majom');
                }, 300)
            });
        },
        function(messages) {
            console.log(messages);
        }
    );*/
}

document.addEventListener("DOMContentLoaded", function() {
    calculator(
        cmp.sugar.Sugar,
        cmp.sugar.Suggestion,
        cmp.candy.Candy
    );
});