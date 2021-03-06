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

var _util = require('util');

var util = _interopRequireWildcard(_util);

var _abstract = require('./abstract');

var _abstract2 = _interopRequireDefault(_abstract);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DescribeAppCommand = function (_CliCommand) {
    _inherits(DescribeAppCommand, _CliCommand);

    function DescribeAppCommand(xublitCli) {
        _classCallCheck(this, DescribeAppCommand);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(DescribeAppCommand).call(this, xublitCli));
    }

    _createClass(DescribeAppCommand, [{
        key: 'run',
        value: function run() {

            this.xublitCli.assertXublitAppInPwd();

            var app = this.xublitCli.app;
            var pkg = app.npmConfig;

            var stats = app.calcStats();

            process.stdout.write(_safe2.default.bold.yellow('\n  /**' + ('\n   * ' + pkg.name + ' - v' + pkg.version) + '\n   */\n'));

            process.stdout.write('\n  ' + _safe2.default.underline('File stats:') + '\n\n');

            Object.keys(stats).forEach(function (key) {

                var renderedValue = _safe2.default.green(_safe2.default.bold(stats[key]));
                var renderedKey = _safe2.default.white(key);

                process.stdout.write('     ' + renderedValue + '   ' + renderedKey + '\n');
            });

            process.stdout.write('\n');
        }
    }]);

    return DescribeAppCommand;
}(_abstract2.default);

exports.default = DescribeAppCommand;
//# sourceMappingURL=describe-app.js.map
