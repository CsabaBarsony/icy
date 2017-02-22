'use strict';

describe('Candy input()', function() {
    let candyInstance,
        container = document.getElementById('container');

    describe('', function() {
        beforeEach(function() {
            candyInstance = new cmp.candy.Candy(container,
                function() {
                    return new Promise(function(resolve) {
                        resolve('majom');
                    });
                },
                function() {}
            );
            const button = container.querySelector('.add_message');
            button.click();
        });

        afterEach(function() {
            container.innerHTML = '';
        });

        it('should display loading', function() {
            expect(candyInstance.model.loading).toBeTruthy();
        });
    });

    describe('', function() {
        beforeEach(function(done) {
            candyInstance = new cmp.candy.Candy(container,
                function() {
                    return new Promise(function(resolve) {
                        setTimeout(function() {
                            resolve('majom');
                            done();
                        }, 0);
                    });
                },
                function() {}
            );
            const button = container.querySelector('.add_message');
            button.click();
        });

        afterEach(function() {
            container.innerHTML = '';
        });

        it('should add a third message item', function(done) {
            setTimeout(function() {
                let items = container.querySelectorAll('li');
                expect(items.length).toBe(3);
                done();
            }, 0);
        });
    });

    describe('', function() {
        let callbackHaveBeenCalled = false;

        beforeEach(function(done) {
            candyInstance = new cmp.candy.Candy(container,
                function() {
                    return new Promise(function(resolve) {
                        resolve('majom');
                    });
                },
                function() {
                    callbackHaveBeenCalled = true;
                    done();
                }
            );
            const button = container.querySelector('.add_message');
            button.click();
        });

        afterEach(function() {
            container.innerHTML = '';
        });

        it('should invoke callback', function(done) {
            setTimeout(function() {
                expect(callbackHaveBeenCalled).toBeTruthy();
                done();
            }, 0);
        });
    });
});
