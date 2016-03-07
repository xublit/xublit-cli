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

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _constants = require('./constants');

var __ = _interopRequireWildcard(_constants);

var _procManager = require('./proc-manager');

var _procManager2 = _interopRequireDefault(_procManager);

var _appRoot = require('./file-system/app-root');

var _appRoot2 = _interopRequireDefault(_appRoot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var jsFilePathRegExp = /.+\.(js|node)$/;
var envConfigFilePathRegExp = /(\/|\\)env(\/|\\).+\.(yml|yaml)$/;

var XublitApplication = function () {
    function XublitApplication(xublitCli, absolutePath) {
        _classCallCheck(this, XublitApplication);

        if (!XublitApplication.isApplicationDirectory(absolutePath)) {
            throw new Error('Xublit Application not found in ' + absolutePath);
        }

        initProps(this, xublitCli, absolutePath);
    }

    _createClass(XublitApplication, [{
        key: 'calcStats',
        value: function calcStats() {
            var _ref;

            return _ref = {}, _defineProperty(_ref, __.STAT_KEY_CONFIGURED_ENVS, this.numConfiguredEnvs), _defineProperty(_ref, __.STAT_KEY_SOURCE_FILES, this.numSourceFiles), _defineProperty(_ref, __.STAT_KEY_TEST_SPECS, this.numTestSpecs), _ref;
        }
    }, {
        key: 'initAppProcess',
        value: function initAppProcess() {

            this.xublitCli.processManager.initNewNodeProcess(this.rootDirectory, path.join(__dirname, 'app-instance.js'));

            return this;
        }
    }, {
        key: 'start',
        value: function start() {

            this.performPreflightChecks().initAppProcess();

            return this;
        }
    }, {
        key: 'performPreflightChecks',
        value: function performPreflightChecks() {

            var rootDirectory = this.rootDirectory;

            if (rootDirectory.containsDir('node_modules')) {
                return this;
            }

            throw new Error('Dir "node_modules" not found, please run `$ npm install` first');
        }
    }], [{
        key: 'isApplicationDirectory',
        value: function isApplicationDirectory(absolutePath) {

            try {
                var applicationRoot = new _appRoot2.default(absolutePath);
            } catch (error) {

                if (__.INVALID_XUBLIT_APPLICATION_ROOT === error.message) {
                    return false;
                }

                throw error;
            }

            return true;
        }
    }]);

    return XublitApplication;
}();

exports.default = XublitApplication;


function initProps(xublitApplication, xublitCli, absolutePath) {

    var processManager;

    var applicationRoot = new _appRoot2.default(absolutePath);

    var xublitConfig = applicationRoot.xublitConfigFile.parseContents(JSON.parse);
    var npmConfig = applicationRoot.npmConfigFile.parseContents(JSON.parse);

    Object.defineProperties(xublitApplication, {

        xublitCli: {
            value: xublitCli
        },

        rootDirectory: {
            value: applicationRoot
        },

        processManager: {
            value: processManager
        },

        config: {
            get: function get() {
                return xublitConfig;
            }
        },

        srcDirs: {
            get: function get() {
                return asArray(xublitConfig.dirs[__.SOURCE_DIRS_CONFIG_KEY]);
            }
        },

        etcDirs: {
            get: function get() {
                return asArray(xublitConfig.dirs[__.ETC_DIRS_CONFIG_KEY]);
            }
        },

        testSpecDirs: {
            get: function get() {
                return asArray(xublitConfig.dirs[__.TEST_SPEC_DIRS_CONFIG_KEY]);
            }
        },

        numConfiguredEnvs: {
            get: function get() {

                var count = 0;
                var paths = [];

                this.etcDirs.forEach(function (subdir) {
                    paths.push.apply(paths, _toConsumableArray(applicationRoot.recursiveLs(subdir)));
                });

                paths.forEach(function (path) {

                    if (!envConfigFilePathRegExp.test(path)) {
                        return;
                    }

                    count++;
                });

                return count;
            }
        },

        numSourceFiles: {
            get: function get() {

                var count = 0;
                var paths = [];

                this.srcDirs.forEach(function (subdir) {
                    paths.push.apply(paths, _toConsumableArray(applicationRoot.recursiveLs(subdir)));
                });

                paths.forEach(function (path) {

                    if (!jsFilePathRegExp.test(path)) {
                        return;
                    }

                    count++;
                });

                return count;
            }
        },

        numTestSpecs: {
            get: function get() {

                var count = 0;
                var paths = [];

                this.testSpecDirs.forEach(function (subdir) {
                    paths.push.apply(paths, _toConsumableArray(applicationRoot.recursiveLs(subdir)));
                });

                paths.forEach(function (path) {

                    if (!jsFilePathRegExp.test(path)) {
                        return;
                    }

                    count++;
                });

                return count;
            }
        },

        npmConfig: {
            get: function get() {
                return npmConfig;
            }
        }

    });
}

function asArray(input) {

    if (Array.isArray(input)) {
        return input;
    }

    return [input];
}
//# sourceMappingURL=xublit-application.js.map
