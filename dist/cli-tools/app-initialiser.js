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
exports.AppInitialiser = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _shelljs = require('shelljs');

var sh = _interopRequireWildcard(_shelljs);

var _constants = require('../constants');

var __ = _interopRequireWildcard(_constants);

var _interactiveCli = require('./interactive-cli');

var _interactiveCli2 = _interopRequireDefault(_interactiveCli);

var _directory = require('../file-system/directory');

var _directory2 = _interopRequireDefault(_directory);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Prompt = _interactiveCli2.default.Prompt();
var Confirm = _interactiveCli2.default.Confirm();

var DEFAULT_APP_VERSION = '1.0.0';
var DEFAULT_LICENSE = 'UNLICENSED';

var EVENT_ACTION_SUCCESS = 'successfulAction';
var EVENT_CRITICAL_ERROR = 'criticalError';
var EVENT_INIT_ABORTED = 'abort';
var EVENT_INIT_COMPLETE = 'complete';
var EVENT_INITIALISING = 'initialising';

var AppInitialiser = exports.AppInitialiser = function (_EventEmitter) {
    _inherits(AppInitialiser, _EventEmitter);

    function AppInitialiser(xublitCli) {
        _classCallCheck(this, AppInitialiser);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AppInitialiser).call(this));

        initProps(_this, xublitCli);

        return _this;
    }

    _createClass(AppInitialiser, [{
        key: 'interactive',
        value: function interactive() {
            var _this2 = this;

            var interactiveCli = new _interactiveCli2.default(this.cli);

            var interactions = standardInteractions(this);

            interactiveCli.queueInteractions(interactions).provideInterface().then(function (choices) {
                initialiseApp(_this2, choices);
            });
        }
    }]);

    return AppInitialiser;
}(_events2.default);

function initProps(appInitialiser, xublitCli) {

    Object.defineProperties(appInitialiser, {

        appRoot: {
            value: xublitCli.workingDirectory
        },

        cli: {
            value: xublitCli.cli
        },

        xublitCli: {
            value: xublitCli
        }

    });
}

function abort(appInitialiser, reason) {
    appInitialiser.emit(EVENT_INIT_ABORTED, reason);
}

function initialiseApp(appInitialiser, options, installModules) {

    var xublitCli = appInitialiser.xublitCli;

    var appName = options.name;
    var appRoot = appInitialiser.appRoot;

    if (appRoot.containsFile('package.json') && false === options.overwritePackageJson) {
        return abort(appInitialiser);
    }

    emit(EVENT_INITIALISING);

    npmInit(appRoot).then(function initAppPkgJson() {

        emit(EVENT_ACTION_SUCCESS, '`npm init` complete');

        appRoot.refresh();

        var appPkgJsonFile = appRoot.file('package.json');
        var appPkgJson = appPkgJsonFile.parseContents(JSON.parse);

        Object.assign(appPkgJson, {
            name: options.name,
            version: options.version,
            description: options.description,
            author: options.author,
            license: options.license
        });

        appPkgJson.scripts.start = 'xublit start';

        appPkgJsonFile.contents = JSON.stringify(appPkgJson, undefined, '  ');
    }).then(function initAppConfig() {
        var _dirs;

        emit(EVENT_ACTION_SUCCESS, 'package.json initialised');

        if (!appRoot.containsFile('xublit.json')) {
            appRoot.mkfile('xublit.json');
        }

        var appCfgJsonFile = appRoot.file('xublit.json');
        var appCfgJson = JSON.parse(appCfgJsonFile.contents || '{}');

        Object.assign(appCfgJson, {
            dirs: (_dirs = {}, _defineProperty(_dirs, __.ETC_DIRS_CONFIG_KEY, 'etc'), _defineProperty(_dirs, __.SOURCE_DIRS_CONFIG_KEY, 'src'), _defineProperty(_dirs, __.TEST_SPEC_DIRS_CONFIG_KEY, 'test/spec'), _dirs),
            modules: {}
        });

        appCfgJsonFile.contents = JSON.stringify(appCfgJson, undefined, '  ');
    }).then(function initAppDirStructure() {

        emit(EVENT_ACTION_SUCCESS, 'xublit.json initialised');

        var skelName = 'app';

        var cliDirectory = xublitCli.directory;
        var skelDirectory = cliDirectory.subdir('skel');
        var sourceDirectory = skelDirectory.subdir(skelName);

        sourceDirectory.subdirs.forEach(function (dirBasename) {

            var src = sourceDirectory.prefixPath(dirBasename);
            var dest = appRoot.prefixPath(dirBasename);

            sh.cp('-R', src, dest);
        });
    }).then(function installDefaultModules() {

        emit(EVENT_ACTION_SUCCESS, 'directory structure initialised');

        installModules = installModules || [];

        if (0 === installModules.length) {
            return;
        }

        var installCmd = util.format('xublit install %s', installModules.join(' '));

        return new Promise(function (resolve, reject) {

            sh.exec(installCmd, { cwd: pwd }, function (code, stdout, stderr) {

                if (0 === code) {
                    emit(EVENT_ACTION_SUCCESS, 'optional modules installed successfully');
                    return resolve();
                }

                resolve();
            });
        });
    }).then(function () {
        emit(EVENT_INIT_COMPLETE, appName);
    }).catch(function (error) {
        emit(EVENT_CRITICAL_ERROR, error);
    });

    function emit() {
        appInitialiser.emit.apply(appInitialiser, arguments);
    }
}

function npmInit(appRoot) {

    var execOptions = {
        cwd: appRoot.absPath,
        silent: true
    };

    return new Promise(function (resolve, reject) {

        sh.exec('npm init --yes', execOptions, cb);

        function cb(code, stdout, stderr) {

            if (0 !== code) {
                return reject(util.format('Exited with code %s:\n%s', code, stderr));
            }

            resolve(appRoot.refresh());
        }
    });
}

function newPrompt(id, opts) {
    return new Prompt(id, opts);
}

function newConfirm(id, opts) {
    return new Confirm(id, opts);
}

function standardInteractions(appInitialiser) {

    var appRoot = appInitialiser.appRoot;

    var interactions = [newPrompt('name', { defaultValue: appRoot.basename }), newPrompt('version', { defaultValue: DEFAULT_APP_VERSION }), newPrompt('license', { defaultValue: DEFAULT_LICENSE }), newPrompt('author')];

    if (appRoot.containsFile('package.json')) {
        interactions.push(newConfirm('overwritePackageJson', {
            phrase: 'This will overwrite existing settings in package.json, continue?',
            defaultValue: false
        }));
    }

    return interactions;
}
//# sourceMappingURL=app-initialiser.js.map
