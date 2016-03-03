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

var _util = require('util');

var util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CommandRegistry = function () {
    function CommandRegistry() {
        _classCallCheck(this, CommandRegistry);

        this.cmds = [];
    }

    _createClass(CommandRegistry, [{
        key: 'register',
        value: function register(cmd, description, handler) {

            var usage = cmd;
            cmd = cmd.split(/\s+/)[0];

            this.cmds.push(cmd);

            this[CommandRegistry.commandKey(cmd)] = {
                usage: usage,
                description: description,
                handler: handler
            };

            return this;
        }
    }, {
        key: 'listAll',
        value: function listAll() {
            return this.cmds.slice(0);
        }
    }, {
        key: 'run',
        value: function run(cmd, xublitCli) {

            if (this.cmds.indexOf(cmd) < 0) {
                throw new Error(util.format('Unrecognised command "%s"', cmd));
            }

            var CommandHandler = this[CommandRegistry.commandKey(cmd)].handler;
            var command = new CommandHandler(xublitCli);

            command.run();
        }
    }], [{
        key: 'commandKey',
        value: function commandKey(cmd) {
            return cmd + '-cmd';
        }
    }]);

    return CommandRegistry;
}();

exports.default = CommandRegistry;
//# sourceMappingURL=cmd-registry.js.map
