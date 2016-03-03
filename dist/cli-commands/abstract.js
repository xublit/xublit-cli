/**
 * Xublit command line interface
 * @version v0.1.0-dev-2016-02-18
 * @link 
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _safe = require('colors/safe');

var _safe2 = _interopRequireDefault(_safe);

var _util = require('util');

var util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ERROR_ABSTRACT_METHOD_NOT_IMPLEMENTED = 'Abstract method %s not implemented in %s';

var CHECK = '✔';
var CROSS = '✘';
var SKULL = '☠';
var WARNING = '⚠';

var CliCommand = function () {
    function CliCommand(xublitCli) {
        _classCallCheck(this, CliCommand);

        initProps(this, xublitCli);
    }

    _createClass(CliCommand, [{
        key: 'writeToStdout',
        value: function writeToStdout(string) {
            process.stdout.write(string);
        }
    }, {
        key: 'writeToStderr',
        value: function writeToStderr(string) {
            process.stderr.write(string);
        }
    }, {
        key: 'log',
        value: function log(color, message) {
            message = [].concat(Array.prototype.slice.call(arguments)).slice(1).join(' ');
            this.writeToStdout(_safe2.default[color || 'white'](message) + '\n');
        }
    }, {
        key: 'reportSuccess',
        value: function reportSuccess(message) {
            this.log('green', CHECK, [].concat(Array.prototype.slice.call(arguments)).join(' '));
        }
    }, {
        key: 'reportWarning',
        value: function reportWarning(message) {
            this.log('yellow', WARNING, [].concat(Array.prototype.slice.call(arguments)).join(' '));
        }
    }, {
        key: 'reportFailure',
        value: function reportFailure(message) {
            this.log('red', CROSS, [].concat(Array.prototype.slice.call(arguments)).join(' '));
        }
    }, {
        key: 'critical',
        value: function critical(message) {
            this.log('red', SKULL, [].concat(Array.prototype.slice.call(arguments)).join(' '));
            process.exit(1);
        }
    }, {
        key: 'run',
        value: function run() {
            throw newAbstractMethodError(this, 'run');
        }
    }]);

    return CliCommand;
}();

exports.default = CliCommand;


function initProps(cliCommand, xublitCli) {

    Object.defineProperties(cliCommand, {

        xublitCli: {
            value: xublitCli
        },

        cmdArgs: {
            get: function get() {

                var args = [];

                [].concat(_toConsumableArray(process.argv)).slice(3).forEach(function (arg) {

                    if ('-' === arg.substr(0, 1)) {
                        return;
                    }

                    args.push(arg);
                });

                return args;
            }
        }

    });
}

function newAbstractMethodError(cliCommand, methodName) {
    return new Error(util.format(ERROR_ABSTRACT_METHOD_NOT_IMPLEMENTED, cliCommand.constructor.name, methodName));
}
//# sourceMappingURL=abstract.js.map
