import EventEmitter from 'events';
import * as sh from 'shelljs';

import * as __ from '../constants';
import InteractiveCli from './interactive-cli';
import Directory from '../file-system/directory';

const Prompt = InteractiveCli.Prompt();
const Confirm = InteractiveCli.Confirm();

const DEFAULT_APP_VERSION = '1.0.0';
const DEFAULT_LICENSE = 'UNLICENSED';

const EVENT_ACTION_SUCCESS = 'successfulAction';
const EVENT_CRITICAL_ERROR = 'criticalError';
const EVENT_INIT_ABORTED = 'abort';
const EVENT_INIT_COMPLETE = 'complete';
const EVENT_INITIALISING = 'initialising';

export class AppInitialiser extends EventEmitter {

    constructor (xublitCli) {
        
        super();

        initProps(this, xublitCli);

    }

    interactive () {

        var interactiveCli = new InteractiveCli(this.cli);

        var interactions = standardInteractions(this);

        interactiveCli
            .queueInteractions(interactions)
            .provideInterface()
            .then((choices) => {
                initialiseApp(this, choices);
            });

    }

}

function initProps (appInitialiser, xublitCli) {

    Object.defineProperties(appInitialiser, {

        appRoot: {
            value: xublitCli.workingDirectory,
        },

        cli: {
            value: xublitCli.cli,
        },

        xublitCli: {
            value: xublitCli,
        },

    });

}

function abort (appInitialiser, reason) {
    appInitialiser.emit(EVENT_INIT_ABORTED, reason);
}

function initialiseApp (appInitialiser, options, installModules) {

    var xublitCli = appInitialiser.xublitCli;

    var appName = options.name;
    var appRoot = appInitialiser.appRoot;

    if (appRoot.containsFile('package.json') &&
        false === options.overwritePackageJson) {
        return abort(appInitialiser);
    }

    emit(EVENT_INITIALISING);

    npmInit(appRoot)
        .then(function initAppPkgJson () {

            emit(EVENT_ACTION_SUCCESS, '`npm init` complete');

            appRoot.refresh();

            let appPkgJsonFile = appRoot.file('package.json');
            let appPkgJson = appPkgJsonFile.parseContents(JSON.parse);

            Object.assign(appPkgJson, {
                name: options.name,
                version: options.version,
                description: options.description,
                author: options.author,
                license: options.license,
            });

            appPkgJson.scripts.start = 'xublit start';

            appPkgJsonFile.contents = JSON.stringify(appPkgJson, undefined, '  ');

        })
        .then(function initAppConfig () {

            emit(EVENT_ACTION_SUCCESS, 'package.json initialised');

            if (!appRoot.containsFile('xublit.json')) {
                appRoot.mkfile('xublit.json');
            }

            let appCfgJsonFile = appRoot.file('xublit.json');
            let appCfgJson = JSON.parse(appCfgJsonFile.contents || '{}');

            Object.assign(appCfgJson, {
                dirs: {
                    [__.ETC_DIRS_CONFIG_KEY]: 'etc',
                    [__.SOURCE_DIRS_CONFIG_KEY]: 'src',
                    [__.TEST_SPEC_DIRS_CONFIG_KEY]: 'test/spec',
                },
                modules: {},
            });

            appCfgJsonFile.contents = JSON.stringify(appCfgJson, undefined, '  ');


        })
        .then(function initAppDirStructure () {

            emit(EVENT_ACTION_SUCCESS, 'xublit.json initialised');

            let skelName = 'app';

            let cliDirectory = xublitCli.directory;
            let skelDirectory = cliDirectory.subdir('skel');
            let sourceDirectory = skelDirectory.subdir(skelName);

            sourceDirectory.subdirs.forEach(function (dirBasename) {

                let src = sourceDirectory.prefixPath(dirBasename);
                let dest = appRoot.prefixPath(dirBasename);

                sh.cp('-R', src, dest);

            });

        })
        .then(function installDefaultModules () {

            emit(EVENT_ACTION_SUCCESS, 'directory structure initialised');

            installModules = installModules || [];

            if (0 === installModules.length) {
                return;
            }
            
            let installCmd = util.format(
                'xublit install %s',
                installModules.join(' ')
            );

            return new Promise(function (resolve, reject) {

                sh.exec(installCmd, { cwd: pwd }, function (code, stdout, stderr) {
                    
                    if (0 === code) {
                        emit(EVENT_ACTION_SUCCESS, 'optional modules installed successfully');
                        return resolve();
                    }

                    resolve();

                });

            });


        })
        .then(function () {
            emit(EVENT_INIT_COMPLETE, appName);
        })
        .catch(function (error) {
            emit(EVENT_CRITICAL_ERROR, error);
        });

    function emit () {
        appInitialiser.emit(...arguments);
    }

}

function npmInit (appRoot) {

    var execOptions = {
        cwd: appRoot.absPath,
        silent: true,
    };

    return new Promise(function (resolve, reject) {

        sh.exec('npm init --yes', execOptions, cb);

        function cb (code, stdout, stderr) {

            if (0 !== code) {
                return reject(util.format(
                    'Exited with code %s:\n%s', code, stderr
                ));
            }

            resolve(appRoot.refresh());

        }

    });

}

function newPrompt (id, opts) {
    return new Prompt(id, opts);
}

function newConfirm (id, opts) {
    return new Confirm(id, opts);
}

function standardInteractions (appInitialiser) {

    var appRoot = appInitialiser.appRoot;

    var interactions = [
        newPrompt('name', { defaultValue: appRoot.basename }),
        newPrompt('version', { defaultValue: DEFAULT_APP_VERSION }),
        newPrompt('license', { defaultValue: DEFAULT_LICENSE }),
        newPrompt('author'),
    ];

    if (appRoot.containsFile('package.json')) {
        interactions.push(newConfirm('overwritePackageJson', {
            phrase: 'This will overwrite existing settings in package.json, continue?',
            defaultValue: false,
        }));
    }

    return interactions;

}
