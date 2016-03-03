/**
 * Xublit command line interface
 * @version v0.1.0-dev-2016-02-18
 * @link 
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require('./constants');

var __ = _interopRequireWildcard(_constants);

var _child_process = require('child_process');

var _procCtrlInterface = require('./proc-ctrl-interface');

var _procCtrlInterface2 = _interopRequireDefault(_procCtrlInterface);

var _procIoId = require('./proc-io-id');

var _procIoId2 = _interopRequireDefault(_procIoId);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var REGFILE_FILENAME = __.PROCMGR_REGFILE_FILENAME;
var REGISTRY_TEMPLATE = __.PROCMGR_REGISTRY_TEMPLATE;

var ProcessManager = function () {
    function ProcessManager(xublitApplication) {

        // initRegfileIfNoneExists(xublitApplication);

        // initProps(this, xublitApplication);

        _classCallCheck(this, ProcessManager);
    }

    _createClass(ProcessManager, [{
        key: 'initNewNodeProcess',
        value: function initNewNodeProcess(absPath) {

            // if (!path.isAbsolute(absPath)) {
            //     throw new Error('First argument must be an absolute path');
            // }

            // var stdio = createIoPipes(this.directory);

            // var args = [];
            // var opts = {
            //     detached: true,
            //     stdio: [
            //         stdio.stdinFilename,
            //         stdio.stdoutFilename,
            //         stdio.stderrFilename,
            //     ],
            //     env: {
            //         pwd: this.rootDirectory.absPath,
            //     },
            // };

            // var childProcess = fork(absPath, args, opts);
            // var pid = getPid(childProcess);

            // child.unref();

            // return new ProcessControlInterface(stdio);

        }
    }]);

    return ProcessManager;
}();

exports.default = ProcessManager;


function createIoPipes(targetDirectory) {

    // var ioId = IoId.uniqueIoId(targetDirectory);

    // var stdinFilePath = targetDirectory.mkfile(ioId.stdinFilename).absPath;
    // var stdoutFilePath = targetDirectory.mkfile(ioId.stdoutFilename).absPath;
    // var stderrFilePath = targetDirectory.mkfile(ioId.stderrFilename).absPath;

    // return {
    //     in: fs.openSync(stdinFilePath, 'a'),
    //     out: fs.openSync(stdoutFilePath, 'a'),
    //     err: fs.openSync(stderrFilePath, 'a'),
    // };

}

function getPid(childProcess) {
    return childProcess.pid;
}

function kill(pid, signal) {}

function initRegfileIfNoneExists(xublitApplication) {

    if (xublitApplication.rootDir.containsFile(REGFILE_FILENAME)) {
        return;
    }

    var currentTs = Date.now();
    var regfile = directory.mkfile(REGFILE_FILENAME);
    var registry = Object.assign({}, REGISTRY_TEMPLATE, {
        createdAt: currentTs,
        lastModifiedAt: currentTs,
        path: directory.absPath
    });

    regfile.contents = JSON.stringify(registry, undefined, '  ');
}

function initProps(processManager, xublitApplication) {

    var rootDirectory = xublitApplication.rootDirectory;
    var regfile = rootDirectory.file(REGFILE_FILENAME);
    var registry = regfile.parseContents(JSON.parse);

    Object.defineProperties(processManager, {

        processes: {
            get: function get() {
                return registry.running.slice(0);
            }
        },

        registry: {
            value: registry
        },

        rootDirectory: {
            value: rootDirectory
        }

    });
}
//# sourceMappingURL=proc-manager.js.map
