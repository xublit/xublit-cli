import * as path from 'path';


/**
 * Miscellaneous
 */

export const ETC_DIRS_CONFIG_KEY = 'etc';
export const SOURCE_DIRS_CONFIG_KEY = 'src';
export const TEST_SPEC_DIRS_CONFIG_KEY = 'spec';

export const STAT_KEY_TEST_SPECS = 'Test specs';
export const STAT_KEY_SOURCE_FILES = 'Source files';
export const STAT_KEY_CONFIGURED_ENVS = 'Environment config files';

export const INVALID_XUBLIT_APPLICATION_ROOT = 'Invalid Xublit Application root directory';
export const INVALID_NPM_PACKAGE_ROOT = 'Invalid NPM Package root directory';


/**
 * Command Line Interface
 */

export const USAGE_INSTRUCTIONS = `<command> [options]

  Commands:

    start               Start the app in the current dir
    preflight           Run pre-flight checks on the current app
    details             Display information about the app in the current dir

    init                Initialise a new app in the current dir
    set <key> <value>   Set value for key in the current app config
    get <key>           Get the value for key from the current app's config

    install <module>    Install a Xublit module
    uninstall <module>  Remove a previously installed module`;


/**
 * File names
 */

export const XUBLIT_CONFIG_FILENAME = 'xublit.json';
export const NPM_PACKAGE_CONFIG_FILENAME = 'package.json';


/**
 * System directory paths
 */

export const APP_DIR_PATH_SUFFIX = 'xublit';

export const WINDOWS_TMP_DATA_DIR_PATH = process.env.TMP || process.env.TEMP;
export const WINDOWS_APP_DATA_DIR_PATH = process.env.APPDATA;

export const OSX_EL_CAPITAN_APP_DATA_DIR_PATH = '/usr/local/lib';

export const UNIX_TMP_DATA_DIR_PATH = '/var/tmp';
export const UNIX_APP_DATA_DIR_PATH = '/usr/lib';

export const TMP_DATA_DIR_PATH = tempDataDirPath();
export const APP_DATA_DIR_PATH = appDataDirPath();

function tempDataDirPath () {

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

function appDataDirPath () {

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
