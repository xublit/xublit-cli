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

var _abstract = require('./abstract');

var _abstract2 = _interopRequireDefault(_abstract);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RunAppCommand = function (_CliCommand) {
    _inherits(RunAppCommand, _CliCommand);

    function RunAppCommand(xublitCli) {
        _classCallCheck(this, RunAppCommand);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(RunAppCommand).call(this, xublitCli));
    }

    _createClass(RunAppCommand, [{
        key: 'run',
        value: function run() {

            this.assertInAppDir();

            this.attemptToStartApp();
        }
    }, {
        key: 'assertInAppDir',
        value: function assertInAppDir() {

            try {
                this.xublitCli.assertXublitAppInPwd();
            } catch (error) {
                this.startFailed('NotInAppDir', 'Xublit application not found in current dir');
            }
        }
    }, {
        key: 'attemptToStartApp',
        value: function attemptToStartApp() {

            var appName = this.xublitCli.app.npmConfig.name;
            var startMessage = 'Starting ' + appName + ' application...';

            this.log('white', startMessage);

            try {
                this.xublitCli.app.start();
            } catch (error) {

                this.debug(error);

                this.startFailed(error.constructor.name, error.message);
            }
        }
    }, {
        key: 'startFailed',
        value: function startFailed(errorType, message) {

            this.reportFailure('Failed to start application - ' + errorType + ': ' + message);

            process.exit(1);
        }
    }]);

    return RunAppCommand;
}(_abstract2.default);

exports.default = RunAppCommand;
//# sourceMappingURL=start-app.js.map
