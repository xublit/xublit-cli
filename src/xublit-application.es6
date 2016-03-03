import * as path from 'path';

import * as __ from './constants';
import processManager from './proc-manager';
import ApplicationRoot from './file-system/app-root';

const jsFilePathRegExp = /.+\.(js|node)$/;
const envConfigFilePathRegExp = /(\/|\\)env(\/|\\).+\.(yml|yaml)$/;

export default class XublitApplication {

    constructor (xublitCli, absolutePath) {

        if (!XublitApplication.isApplicationDirectory(absolutePath)) {
            throw new Error(`Xublit Application not found in ${absolutePath}`);
        }

        initProps(this, xublitCli, absolutePath);

    }

    static isApplicationDirectory (absolutePath) {

        try {
            var applicationRoot = new ApplicationRoot(absolutePath);
        }
        catch (error) {

            if (__.INVALID_XUBLIT_APPLICATION_ROOT === error.message) {
                return false;
            }

            throw error;

        }

        return true;

    }

    calcStats () {
        return {
            [__.STAT_KEY_CONFIGURED_ENVS]: this.numConfiguredEnvs,
            [__.STAT_KEY_SOURCE_FILES]: this.numSourceFiles,
            [__.STAT_KEY_TEST_SPECS]: this.numTestSpecs,
        };
    }

    initAppProcess () {

        this.xublitCli.processManager.initNewNodeProcess(
            this.rootDirectory,
            path.join(__dirname, 'app-instance.js')
        );

        return this;

    }

    start () {

        this.performPreflightChecks()
            .initAppProcess();

        return this;

    }

    performPreflightChecks () {

        var rootDirectory = this.rootDirectory;

        if (rootDirectory.containsDir('node_modules')) {
            return this;
        }

        throw new Error(
            `Dir "node_modules" not found, please run \`$ npm install\` first`
        );

    }

}

function initProps (xublitApplication, xublitCli, absolutePath) {

    var processManager;

    var applicationRoot = new ApplicationRoot(absolutePath);

    var xublitConfig = applicationRoot.xublitConfigFile.parseContents(JSON.parse);
    var npmConfig = applicationRoot.npmConfigFile.parseContents(JSON.parse);

    Object.defineProperties(xublitApplication, {

        xublitCli: {
            value: xublitCli,
        },

        rootDirectory: {
            value: applicationRoot,
        },

        processManager: {
            value: processManager,
        },

        config: {
            get: function () {
                return xublitConfig;
            },
        },

        srcDirs: {
            get: function () {
                return asArray(xublitConfig.dirs[__.SOURCE_DIRS_CONFIG_KEY]);
            },
        },

        etcDirs: {
            get: function () {
                return asArray(xublitConfig.dirs[__.ETC_DIRS_CONFIG_KEY]);
            },
        },

        testSpecDirs: {
            get: function () {
                return asArray(xublitConfig.dirs[__.TEST_SPEC_DIRS_CONFIG_KEY]);
            },
        },

        numConfiguredEnvs: {
            get: function () {

                let count = 0;
                let paths = [];

                this.etcDirs.forEach((subdir) => {
                    paths.push(...applicationRoot.recursiveLs(subdir));
                });

                paths.forEach((path) => {

                    if (!envConfigFilePathRegExp.test(path)) {
                        return;
                    }

                    count++;

                });

                return count;

            },
        },

        numSourceFiles: {
            get: function () {

                let count = 0;
                let paths = [];

                this.srcDirs.forEach((subdir) => {
                    paths.push(...applicationRoot.recursiveLs(subdir));
                });

                paths.forEach((path) => {

                    if (!jsFilePathRegExp.test(path)) {
                        return;
                    }

                    count++;

                });

                return count;

            },
        },

        numTestSpecs: {
            get: function () {

                let count = 0;
                let paths = [];

                this.testSpecDirs.forEach((subdir) => {
                    paths.push(...applicationRoot.recursiveLs(subdir));
                });

                paths.forEach((path) => {

                    if (!jsFilePathRegExp.test(path)) {
                        return;
                    }

                    count++;

                });

                return count;

            },
        },

        npmConfig: {
            get: function () {
                return npmConfig;
            },
        },

    });

}

function asArray (input) {

    if (Array.isArray(input)) {
        return input;
    }

    return [input];

}
