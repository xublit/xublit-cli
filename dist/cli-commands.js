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
exports.list = list;
exports.run = run;

var _cmdRegistry = require('./cmd-registry');

var _cmdRegistry2 = _interopRequireDefault(_cmdRegistry);

var _initApp = require('./cli-commands/init-app');

var _initApp2 = _interopRequireDefault(_initApp);

var _lsproc = require('./cli-commands/lsproc');

var _lsproc2 = _interopRequireDefault(_lsproc);

var _startApp = require('./cli-commands/start-app');

var _startApp2 = _interopRequireDefault(_startApp);

var _installModule = require('./cli-commands/install-module');

var _installModule2 = _interopRequireDefault(_installModule);

var _describeApp = require('./cli-commands/describe-app');

var _describeApp2 = _interopRequireDefault(_describeApp);

var _appPreflight = require('./cli-commands/app-preflight');

var _appPreflight2 = _interopRequireDefault(_appPreflight);

var _addConfigValues = require('./cli-commands/add-config-values');

var _addConfigValues2 = _interopRequireDefault(_addConfigValues);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var commandRegistry = new _cmdRegistry2.default();

commandRegistry.register('init', 'Initialise a new app in the current dir', _initApp2.default).register('install <module>', 'Install a Xublit module for the current app', _installModule2.default).register('start', 'Start the app in the current dir', _startApp2.default).register('preflight', 'Run pre-flight checks on the current app', _appPreflight2.default).register('info', 'Display information about the app in the current dir', _describeApp2.default).register('add <key> <values>', 'Add values for key in current app config', _addConfigValues2.default).register('lsproc', 'List running processes', _lsproc2.default);

function list() {
    return commandRegistry.listAll();
}

function run(cmd, xublitCli) {
    commandRegistry.run(cmd, xublitCli);
}
//# sourceMappingURL=cli-commands.js.map
