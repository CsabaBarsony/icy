'use strict';

(function(app, bella) {
    function Store() {}

    Store.prototype.getFood = function(id, callback) {

    };

    Store.prototype.getAllFoods = function(callback) {
        bella.ajax.get('/getallfoods', (success, data) => {
            if(success) {
                callback(data);
            }
            else {
                console.log(data);
            }
        });
    };

    app.Store = Store;
}(app, bella));
