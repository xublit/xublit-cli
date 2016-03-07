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

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _constants = require('./constants');

var __ = _interopRequireWildcard(_constants);

var _child_process = require('child_process');

var _procCtrlInterface = require('./proc-ctrl-interface');

var _procCtrlInterface2 = _interopRequireDefault(_procCtrlInterface);

var _procIoId = require('./proc-io-id');

var _procIoId2 = _interopRequireDefault(_procIoId);

var _timeDifferential = require('./utils/time-differential');

var _timeDifferential2 = _interopRequireDefault(_timeDifferential);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var REGEXP_PROC_INFO_FILENAME = /^proc\-([a-z0-9]+)\.json$/i;

var ProcessManager = function () {
    function ProcessManager(xublitCli) {
        _classCallCheck(this, ProcessManager);

        initProps(this, xublitCli);
    }

    _createClass(ProcessManager, [{
        key: 'listXublitProcessIds',
        value: function listXublitProcessIds() {

            var allProcDirFilenames = this.processDirectory.filenames;
            var procFilenames = allProcDirFilenames.filter(function (filename) {
                return REGEXP_PROC_INFO_FILENAME.test(filename);
            });

            return procFilenames.map(function (procFilename) {
                return procFilename.match(REGEXP_PROC_INFO_FILENAME)[1];
            });
        }
    }, {
        key: 'statProcess',
        value: function statProcess(xublitProcessId) {

            var procFile;
            var filename = procIdToFilename(xublitProcessId);

            if (!this.processDirectory.containsFile(filename)) {
                return undefined;
            }

            procFile = this.processDirectory.file(filename);

            try {
                var stats = JSON.parse(procFile.contents);
                stats.uptime = timeSince(stats.startedAt);
                return stats;
            } catch (e) {
                console.log(e.stack);
            }
        }
    }, {
        key: 'initNewNodeProcess',
        value: function initNewNodeProcess(pwd, absPath) {

            if (!path.isAbsolute(absPath)) {
                throw new Error('First argument must be an absolute path');
            }

            var appRootPath = pwd.absPath;
            var processDirectory = this.processDirectory;

            var xublitProcessId = new _procIoId2.default();

            var stdio = createProcessFilesFor(xublitProcessId).in(this.processDirectory);

            var args = [];
            var opts = {
                detached: true,
                stdio: [stdio.in, stdio.out, stdio.err],
                env: {
                    pwd: appRootPath
                }
            };

            var childProcess = (0, _child_process.fork)(absPath, args, opts);
            var pid = getPidFor(childProcess);

            childProcess.unref();

            var now = Date.now();
            var procInfo = {
                pid: pid,
                xublitPid: xublitProcessId.value,
                appRoot: appRootPath,
                startedAt: now,
                stoppedAt: null
            };

            var procInfoFile = processDirectory.mkfile(procIdToFilename(xublitProcessId));

            procInfoFile.contents = JSON.stringify(procInfo, undefined, '  ');

            return new _procCtrlInterface2.default(procInfoFile);
        }
    }]);

    return ProcessManager;
}();

exports.default = ProcessManager;


function createProcessFilesFor(xublitProcessId) {

    var stdInFilename = xublitProcessId + '.in';
    var stdOutFilename = xublitProcessId + '.out';
    var stdErrFilename = xublitProcessId + '.err';

    return {
        in: function _in(directory) {
            return {
                in: fs.openSync(directory.mkfile(stdInFilename).absPath, 'a'),
                out: fs.openSync(directory.mkfile(stdOutFilename).absPath, 'a'),
                err: fs.openSync(directory.mkfile(stdErrFilename).absPath, 'a')
            };
        }
    };
}

function getPidFor(childProcess) {
    return childProcess.pid;
}

function kill(pid, signal) {}

function procIdToFilename(xublitProcessId) {
    return 'proc-' + xublitProcessId + '.json';
}

function initProps(processManager, xublitCli) {

    var dataDirectory = xublitCli.dataDirectory;
    var processDirectory = dataDirectory.procSubdir;

    Object.defineProperties(processManager, {

        xublitCli: {
            value: xublitCli
        },

        running: {
            get: function get() {

                var xublitProcessIds = processManager.listXublitProcessIds();

                var processes = xublitProcessIds.map(function (xublitProcessId) {
                    return processManager.statProcess(xublitProcessId);
                });

                return processes.filter(function (proc) {

                    if (undefined === proc) {
                        return false;
                    }

                    if (null !== proc.stoppedAt) {
                        return false;
                    }

                    return true;
                });
            }
        },

        processDirectory: {
            value: processDirectory
        }

    });
}

function listOfProcessesIn(processDirectory) {
    return processDirectory.files.filter(function (processFileName) {
        return (/[0-9a-z]+]\.json/.test(processFileName)
        );
    });
}

function timeSince(ms) {
    return new _timeDifferential2.default(Date.now(), ms);
}
//# sourceMappingURL=proc-manager.js.map
