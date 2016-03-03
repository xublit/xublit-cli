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

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _commanderPlus = require('commander-plus');

var _commanderPlus2 = _interopRequireDefault(_commanderPlus);

var _constants = require('./constants');

var __ = _interopRequireWildcard(_constants);

var _directory = require('./file-system/directory');

var _directory2 = _interopRequireDefault(_directory);

var _xublitApplication = require('./xublit-application');

var _xublitApplication2 = _interopRequireDefault(_xublitApplication);

var _npmPkgRoot = require('./file-system/npm-pkg-root');

var _npmPkgRoot2 = _interopRequireDefault(_npmPkgRoot);

var _cliTmpRoot = require('./file-system/cli-tmp-root');

var _cliTmpRoot2 = _interopRequireDefault(_cliTmpRoot);

var _cmdRunner = require('./cmd-runner');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_OPTIONS = {
    pwd: process.cwd(),
    cliRootPath: path.resolve(__dirname, '..')
};

var XublitCli = function () {
    function XublitCli(opts) {
        _classCallCheck(this, XublitCli);

        opts = opts || {};

        initProps(this, opts);

        initCli(this);
    }

    _createClass(XublitCli, [{
        key: 'assertXublitAppInPwd',
        value: function assertXublitAppInPwd() {

            if (this.app instanceof _xublitApplication2.default) {
                return;
            }

            throw new Error(util.format('Xublit Application not found in %s', this.pwd));
        }
    }]);

    return XublitCli;
}();

exports.default = XublitCli;


function initCli(xublitCli) {

    _commanderPlus2.default.version(xublitCli.pkg.version);

    _commanderPlus2.default.usage(__.USAGE_INSTRUCTIONS);

    var availableCmds = (0, _cmdRunner.list)();
    availableCmds.forEach(function (cmd) {
        _commanderPlus2.default.on(cmd, function () {
            (0, _cmdRunner.run)(cmd, xublitCli);
        });
    });

    _commanderPlus2.default.parse(process.argv);
}

function initProps(xublitCli, opts) {

    opts = Object.assign({}, DEFAULT_OPTIONS, opts);

    var xublitApplication;

    try {
        xublitApplication = new _xublitApplication2.default(opts.pwd);
    } catch (error) {
        // fail silently
    }

    var workingDirectory = undefined !== xublitApplication ? xublitApplication.rootDirectory : new _directory2.default(opts.pwd);

    var cliDirectory = new _npmPkgRoot2.default(opts.cliRootPath);
    var tempDirectory = new _cliTmpRoot2.default(__.TMP_DATA_DIR_PATH);

    var npmConfigFile = cliDirectory.npmConfigFile;
    var npmConfig = npmConfigFile.parseContents(JSON.parse);

    Object.defineProperties(xublitCli, {

        app: {
            get: function get() {
                return xublitApplication;
            }
        },

        cli: {
            get: function get() {
                return _commanderPlus2.default;
            }
        },

        directory: {
            value: cliDirectory
        },

        pkg: {
            value: npmConfig
        },

        pwd: {
            get: function get() {
                return workingDirectory.toString();
            },
            set: function set(newValue) {

                if (!newValue) {
                    return;
                }

                var newWorkingDirectory = new _directory2.default(newValue);

                if (newWorkingDirectory.containsFile(__.XUBLIT_CONFIG_FILENAME)) {
                    xublitApplication = new _xublitApplication2.default(workingDirectory.absPath);

                    newWorkingDirectory = xublitApplication.rootDirectory;
                }

                workingDirectory = newWorkingDirectory;
            }
        },

        tempDirectory: {
            value: tempDirectory
        },

        workingDirectory: {
            value: workingDirectory
        }

    });
}
//# sourceMappingURL=xublit-cli.js.map
