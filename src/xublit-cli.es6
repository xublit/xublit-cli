import * as path from 'path';
import cli from 'commander-plus';

import * as __ from './constants';
import Directory from './file-system/directory';
import XublitApplication from './xublit-application';
import NpmPackageRoot from './file-system/npm-pkg-root';
import CliAppDataRoot from './file-system/directories/cli-app-data-root';

import ProcessManager from './proc-manager';

import { run as runCmd, list as listCmds } from './cli-commands';

const DEFAULT_OPTIONS = {
    pwd: process.cwd(),
    cliRootPath: path.resolve(__dirname, '..'),
};

export default class XublitCli {

    constructor (opts) {

        opts = opts || {};

        initProps(this, opts);

        initProcessManager(this);

        initCli(this);

    }

    assertXublitAppInPwd () {

        if (this.app instanceof XublitApplication) {
            return;
        }
        
        throw new Error(`Xublit Application not found in ${this.pwd}`);
        
    }

}

function initCli (xublitCli) {

    cli.version(xublitCli.pkg.version);

    cli.usage(__.USAGE_INSTRUCTIONS);

    var availableCmds = listCmds();
    availableCmds.forEach((cmd) => {
        cli.on(cmd, () => {
            runCmd(cmd, xublitCli);
        });
    });

    cli.parse(process.argv);

}

function initProcessManager (xublitCli) {

    var processManager = new ProcessManager(xublitCli);

    Object.defineProperty(xublitCli, 'processManager', {
        get: function () {
            return processManager;
        },
    });

}

function initProps (xublitCli, opts) {

    opts = Object.assign({}, DEFAULT_OPTIONS, opts);

    var xublitApplication;

    try {
        xublitApplication = new XublitApplication(xublitCli, opts.pwd);
    }
    catch (error) {
        // fail silently
    }

    var workingDirectory = undefined !== xublitApplication ?
        xublitApplication.rootDirectory :
        new Directory(opts.pwd);
    
    var cliDirectory = new NpmPackageRoot(opts.cliRootPath);
    var dataDirectory = new CliAppDataRoot(__.APP_DATA_DIR_PATH);

    var npmConfigFile = cliDirectory.npmConfigFile;
    var npmConfig = JSON.parse(npmConfigFile.contents);

    Object.defineProperties(xublitCli, {

        app: {
            get: function () {
                return xublitApplication;
            },
        },

        cli: {
            get: function () {
                return cli;
            },
        },

        directory: {
            value: cliDirectory,
        },

        pkg: {
            value: npmConfig,
        },

        pwd: {
            get: function () {
                return workingDirectory.toString();
            },
            set: function (newValue) {
                
                if (!newValue) {
                    return;
                }

                var newWorkingDirectory = new Directory(newValue);

                if (newWorkingDirectory.containsFile(__.XUBLIT_CONFIG_FILENAME)) {
                    xublitApplication = new XublitApplication(
                        workingDirectory.absPath
                    );
                    
                    newWorkingDirectory = xublitApplication.rootDirectory;

                }

                workingDirectory = newWorkingDirectory;

            },
        },

        dataDirectory: {
            value: dataDirectory,
        },

        workingDirectory: {
            value: workingDirectory,
        },

    });

}
