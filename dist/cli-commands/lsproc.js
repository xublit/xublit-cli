/**
 * Xublit command line interface
 * @version v0.1.0-dev-2016-03-08
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

var _duration = require('../utils/renderers/duration');

var _duration2 = _interopRequireDefault(_duration);

var _abstract = require('./abstract');

var _abstract2 = _interopRequireDefault(_abstract);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LsprocCommand = function (_CliCommand) {
    _inherits(LsprocCommand, _CliCommand);

    function LsprocCommand(xublitCli) {
        _classCallCheck(this, LsprocCommand);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(LsprocCommand).call(this, xublitCli));
    }

    _createClass(LsprocCommand, [{
        key: 'run',
        value: function run() {

            var durationRenderer = new _duration2.default();

            var running = this.xublitCli.processManager.running;
            var numRunning = running.length;

            var renderedNumRunning = _safe2.default.green(numRunning);
            var runningProcesses = numRunning === 1 ? ' running process' : ' running processes';

            process.stdout.write('\n  ' + renderedNumRunning + ' ' + runningProcesses);

            if (numRunning < 1) {
                return;
            }

            running.forEach(function (proc) {

                var xublitPid = _safe2.default.blue(proc.xublitPid);
                var appRootPath = _safe2.default.grey(proc.appRoot);
                var uptime = durationRenderer.render(proc.uptime);

                process.stdout.write('\n' + ('\n    ' + xublitPid) + ('\n    ' + appRootPath + '\n') + ('\n      (PID)    ' + proc.pid) + ('\n      (Uptime) ' + uptime));
            });

            process.stdout.write('\n');
        }
    }]);

    return LsprocCommand;
}(_abstract2.default);

exports.default = LsprocCommand;
//# sourceMappingURL=lsproc.js.map
