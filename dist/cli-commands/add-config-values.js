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

var _abstract = require('./abstract');

var _abstract2 = _interopRequireDefault(_abstract);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddConfigValuesCommand = function (_CliCommand) {
    _inherits(AddConfigValuesCommand, _CliCommand);

    function AddConfigValuesCommand(xublitCli) {
        _classCallCheck(this, AddConfigValuesCommand);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(AddConfigValuesCommand).call(this, xublitCli));
    }

    _createClass(AddConfigValuesCommand, [{
        key: 'run',
        value: function run() {
            var _config$key;

            this.xublitCli.assertXublitAppInPwd();

            var valuesToAdd = this.cmdArgs;
            var key = valuesToAdd.splice(0, 1);

            var app = this.xublitCli.app;
            var xublitConfigFile = app.rootDirectory.xublitConfigFile;

            var config = xublitConfigFile.parseContents(JSON.parse);
            if (!(key in config)) {
                config[key] = [];
            }

            (_config$key = config[key]).push.apply(_config$key, _toConsumableArray(valuesToAdd));

            xublitConfigFile.contents = JSON.stringify(config, undefined, '  ');
        }
    }]);

    return AddConfigValuesCommand;
}(_abstract2.default);

exports.default = AddConfigValuesCommand;
//# sourceMappingURL=add-config-values.js.map
