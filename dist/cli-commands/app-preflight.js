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

var AppPreflightCommand = function (_CliCommand) {
    _inherits(AppPreflightCommand, _CliCommand);

    function AppPreflightCommand(xublitCli) {
        _classCallCheck(this, AppPreflightCommand);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(AppPreflightCommand).call(this, xublitCli));
    }

    _createClass(AppPreflightCommand, [{
        key: 'run',
        value: function run() {

            this.xublitCli.assertXublitAppInPwd();

            try {
                this.xublitCli.app.performPreflightChecks();
            } catch (error) {

                this.debug(error);

                var errorType = error.constructor.name;

                this.reportFailure('Preflight failed - ' + errorType + ': ' + error.message);

                process.exit(1);
            }

            this.reportSuccess('Preflight looks good');
        }
    }]);

    return AppPreflightCommand;
}(_abstract2.default);

exports.default = AppPreflightCommand;
//# sourceMappingURL=app-preflight.js.map
