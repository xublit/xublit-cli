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

var _abstract = require('./abstract');

var _abstract2 = _interopRequireDefault(_abstract);

var _appInitialiser = require('../cli-tools/app-initialiser');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InitAppCommand = function (_CliCommand) {
    _inherits(InitAppCommand, _CliCommand);

    function InitAppCommand(xublitCli) {
        _classCallCheck(this, InitAppCommand);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(InitAppCommand).call(this, xublitCli));
    }

    _createClass(InitAppCommand, [{
        key: 'run',
        value: function run() {

            var appInitialiser = new _appInitialiser.AppInitialiser(this.xublitCli);

            bindInitEventListeners(this, appInitialiser);

            appInitialiser.interactive();
        }
    }]);

    return InitAppCommand;
}(_abstract2.default);

exports.default = InitAppCommand;


function bindInitEventListeners(initAppCommand, appInitialiser) {

    appInitialiser.on('abort', function (reason) {

        if (reason) {
            initAppCommand.log('white', reason);
        }

        initAppCommand.reportWarning('App init aborted');

        process.exit(1);
    });

    appInitialiser.on('complete', function (appName) {

        initAppCommand.reportSuccess(util.format('Xublit app %s successfully initialised', appName));

        process.exit();
    });

    appInitialiser.on('criticalError', function (error) {

        var errorType = error.constructor.name;
        var errorMessage = error.message;

        initAppCommand.reportFailure('App init failed:', errorMessage);

        initAppCommand.writeToStderr(error.stack);

        process.exit(1);
    });

    appInitialiser.on('initialising', function () {
        initAppCommand.log('cyan', '\nInitialising Xublit app...\n');
    });

    appInitialiser.on('successfulAction', function (details) {
        initAppCommand.reportSuccess(details);
    });
}
//# sourceMappingURL=init-app.js.map
