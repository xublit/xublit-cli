'use strict';

var util = require('util');

exports.ref = '$demoCoreModule';
exports.inject = ['demoSingletonModule'];
exports.bootstrap = function (demoSingletonModule) {

    class DemoCoreModule {

        constructor () {

            console.log('The $demoCoreModule is being instantiated!');

            console.log(
                'The "demoSingletonModule" says:', 
                demoSingletonModule.saySomethingFunny()
            );

            var iterations = 0;

            console.log(
                'The app process will hang around like a normal Node.js app -',
                '\nthat is: it won\'t end until until the Node.js event loop',
                'is empty and has nothing else to schedule.',
                '\n\nSee: https://nodejs.org/api/process.html'
            );

            var interval = setInterval(function () {

                if (iterations === 10) {
                    clearInterval(interval);
                }

                console.log(util.format(
                    'I\'m just hanging around until %s === 0...',
                    10 - iterations
                ));

                iterations++;

            });

            process.on('beforeExit', function () {
                console.log('Nothing left to do! Ciao =)');
            });

        }

    }

    return DemoCoreModule;

}