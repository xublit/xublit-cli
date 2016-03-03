'use strict';

exports.ref = 'demoSingletonModule';
exports.inject = ['DemoModule'];
exports.bootstrap = function (DemoModule) {

    class DemoSingletonModule extends DemoModule {

        constructor () {

            super();

        }

        saySomethingFunny () {
            return 'Umm ...lol?';
        }

    }

    return DemoSingletonModule;

}