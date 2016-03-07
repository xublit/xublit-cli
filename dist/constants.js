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
exports.APP_DATA_DIR_PATH = exports.TMP_DATA_DIR_PATH = exports.UNIX_APP_DATA_DIR_PATH = exports.UNIX_TMP_DATA_DIR_PATH = exports.OSX_EL_CAPITAN_APP_DATA_DIR_PATH = exports.WINDOWS_APP_DATA_DIR_PATH = exports.WINDOWS_TMP_DATA_DIR_PATH = exports.APP_DIR_PATH_SUFFIX = exports.NPM_PACKAGE_CONFIG_FILENAME = exports.XUBLIT_CONFIG_FILENAME = exports.USAGE_INSTRUCTIONS = exports.INVALID_NPM_PACKAGE_ROOT = exports.INVALID_XUBLIT_APPLICATION_ROOT = exports.STAT_KEY_CONFIGURED_ENVS = exports.STAT_KEY_SOURCE_FILES = exports.STAT_KEY_TEST_SPECS = exports.TEST_SPEC_DIRS_CONFIG_KEY = exports.SOURCE_DIRS_CONFIG_KEY = exports.ETC_DIRS_CONFIG_KEY = undefined;

var _path = require('path');

var path = _interopRequireWildcard(_path);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Miscellaneous
 */

var ETC_DIRS_CONFIG_KEY = exports.ETC_DIRS_CONFIG_KEY = 'etc';
var SOURCE_DIRS_CONFIG_KEY = exports.SOURCE_DIRS_CONFIG_KEY = 'src';
var TEST_SPEC_DIRS_CONFIG_KEY = exports.TEST_SPEC_DIRS_CONFIG_KEY = 'spec';

var STAT_KEY_TEST_SPECS = exports.STAT_KEY_TEST_SPECS = 'Test specs';
var STAT_KEY_SOURCE_FILES = exports.STAT_KEY_SOURCE_FILES = 'Source files';
var STAT_KEY_CONFIGURED_ENVS = exports.STAT_KEY_CONFIGURED_ENVS = 'Environment config files';

var INVALID_XUBLIT_APPLICATION_ROOT = exports.INVALID_XUBLIT_APPLICATION_ROOT = 'Invalid Xublit Application root directory';
var INVALID_NPM_PACKAGE_ROOT = exports.INVALID_NPM_PACKAGE_ROOT = 'Invalid NPM Package root directory';

/**
 * Command Line Interface
 */

var USAGE_INSTRUCTIONS = exports.USAGE_INSTRUCTIONS = '<command> [options]\n\n  Commands:\n\n    start               Start the app in the current dir\n    preflight           Run pre-flight checks on the current app\n    details             Display information about the app in the current dir\n\n    init                Initialise a new app in the current dir\n    set <key> <value>   Set value for key in the current app config\n    get <key>           Get the value for key from the current app\'s config\n\n    install <module>    Install a Xublit module\n    uninstall <module>  Remove a previously installed module';

/**
 * File names
 */

var XUBLIT_CONFIG_FILENAME = exports.XUBLIT_CONFIG_FILENAME = 'xublit.json';
var NPM_PACKAGE_CONFIG_FILENAME = exports.NPM_PACKAGE_CONFIG_FILENAME = 'package.json';

/**
 * System directory paths
 */

var APP_DIR_PATH_SUFFIX = exports.APP_DIR_PATH_SUFFIX = 'xublit';

var WINDOWS_TMP_DATA_DIR_PATH = exports.WINDOWS_TMP_DATA_DIR_PATH = process.env.TMP || process.env.TEMP;
var WINDOWS_APP_DATA_DIR_PATH = exports.WINDOWS_APP_DATA_DIR_PATH = process.env.APPDATA;

var OSX_EL_CAPITAN_APP_DATA_DIR_PATH = exports.OSX_EL_CAPITAN_APP_DATA_DIR_PATH = '/usr/local/lib';

var UNIX_TMP_DATA_DIR_PATH = exports.UNIX_TMP_DATA_DIR_PATH = '/var/tmp';
var UNIX_APP_DATA_DIR_PATH = exports.UNIX_APP_DATA_DIR_PATH = '/usr/lib';

var TMP_DATA_DIR_PATH = exports.TMP_DATA_DIR_PATH = tempDataDirPath();
var APP_DATA_DIR_PATH = exports.APP_DATA_DIR_PATH = appDataDirPath();

function tempDataDirPath() {

    var dirPath;

    switch (process.platform) {

        case 'win32':
            dirPath = WINDOWS_TMP_DATA_DIR_PATH;
            break;

        case 'linux':
        // no break

        case 'freebsd':
        // no break

        case 'sunos':
        // no break

        case 'darwin':
        // no break

        default:
            dirPath = UNIX_TMP_DATA_DIR_PATH;

    }

    return path.join(dirPath, APP_DIR_PATH_SUFFIX);
}

function appDataDirPath() {

    var dirPath;

    switch (process.platform) {

        case 'win32':
            dirPath = WINDOWS_APP_DATA_DIR_PATH;
            break;

        case 'darwin':
            dirPath = OSX_EL_CAPITAN_APP_DATA_DIR_PATH;
            break;

        case 'linux':
        // no break

        case 'freebsd':
        // no break

        case 'sunos':
        // no break

        default:
            dirPath = UNIX_APP_DATA_DIR_PATH;

    }

    return path.join(dirPath, APP_DIR_PATH_SUFFIX);
}
//# sourceMappingURL=constants.js.map
