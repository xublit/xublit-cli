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

var _abstract = require('./abstract');

var _abstract2 = _interopRequireDefault(_abstract);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import * as util from 'util';
// import EventEmitter from 'events';

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

var InstallModuleCommand = function (_CliCommand) {
    _inherits(InstallModuleCommand, _CliCommand);

    function InstallModuleCommand(xublitCli) {
        _classCallCheck(this, InstallModuleCommand);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(InstallModuleCommand).call(this, xublitCli));
    }

    _createClass(InstallModuleCommand, [{
        key: 'run',
        value: function run() {

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
    }]);

    return InstallModuleCommand;
}(_abstract2.default);

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


exports.default = InstallModuleCommand;
//# sourceMappingURL=install-module.js.map
