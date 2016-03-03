// import * as util from 'util';
// import EventEmitter from 'events';

import CliCommand from './abstract';


// class ModuleInstaller extends EventEmitter {

//     constructor (xublitApplication) {

//         super();

//         initProps(this, xublitApplication);

//     }

//     install (moduleName) {

//         this.emit('install.started', moduleName);

//         npmInstall()
//             .then(() => {
//                 this.emit('install.succeeded', moduleName);
//             })
//             .catch((error) => {
//                 this.emit('install.failed', moduleName);
//             });

//         function npmInstall () {

//         }

//     }

// }

// function npmInstall (moduleName) {

//     var cmd = util.format('npm install --save %s', moduleName);

//     return sh.exec(cmd, { cwd: pwd });
// }

// function initProps (moduleInstaller, xublitApplication) {

//     var started = [];
//     var failed = [];
//     var succeeded = [];

//     Object.defineProperties(moduleInstaller, {

//         xublitApplication: {
//             value: xublitApplication,
//         },

//     });

//     moduleInstaller.on('install.started', (moduleName) => {
//         started.push(moduleName);
//     });

//     moduleInstaller.on('install.succeeded', (moduleName) => {
//         succeeded.push(moduleName);
//     });

//     moduleInstaller.on('install.failed', (moduleName) => {
//         failed.push(moduleName);
//     });

// }

export default class InstallModuleCommand extends CliCommand {

    constructor (xublitCli) {

        super(xublitCli);

    }

    run () {

        this.xublitCli.assertXublitAppInPwd();

        // var app = this.xublitCli.app;
        // var config = app.config;
        // var modulesConfig = config.modules || [];

        // var requestedModules = this.cmdArgs;
        // var modulesAlreadyInstalled = modulesConfig;

        // var modulesToInstall = filterAlreadyInstalled(
        //     requestedModules, 
        //     modulesAlreadyInstalled
        // );

        // if (modulesToInstall.length < 1) {
        //     this.reportWarning('No new modules to install');
        //     process.exit();
        // }

        // var moduleInstaller = new ModuleInstaller(app);

        // moduleInstaller.on('install.failed', (moduleName, error) => {
        //     this.reportFailure(util.format(
        //         'Unable to install module "%s": %s',
        //         moduleName,
        //         error.message
        //     ));
        // });

        // moduleInstaller.on('install.succeeded', (moduleName) => {
        //     this.reportSuccess(util.format(
        //         'Successfully installed module "%s"',
        //         moduleName
        //     ));
        // });

        // modulesToInstall.forEach((moduleName) => {
        //     moduleInstaller.install(modulesToInstall, app);
        // });
        
    }

}

// function filterAlreadyInstalled (requestedModules, modulesAlreadyInstalled) {

//     var modulesToInstall = [];

//     requestedModules.forEach((moduleName) => {
        
//         if (modulesAlreadyInstalled.indexOf(moduleName) > -1) {
//             return;
//         }
        
//         modulesToInstall.push(moduleName);

//     });

//     return modulesToInstall;

// }
