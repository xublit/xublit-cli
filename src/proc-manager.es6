import * as fs from 'fs';
import * as path from 'path';
import * as __ from './constants';

import { fork } from 'child_process';

import ProcessControlInterface from './proc-ctrl-interface';
import IoId from './proc-io-id';

import TimeDifferential from './utils/time-differential';

const REGEXP_PROC_INFO_FILENAME = /^proc\-([a-z0-9]+)\.json$/i;

export default class ProcessManager {

    constructor (xublitCli) {

        initProps(this, xublitCli);

    }

    listXublitProcessIds () {

        var allProcDirFilenames = this.processDirectory.filenames;
        var procFilenames = allProcDirFilenames.filter(function (filename) {
            return REGEXP_PROC_INFO_FILENAME.test(filename);
        });

        return procFilenames.map(function (procFilename) {
            return procFilename.match(REGEXP_PROC_INFO_FILENAME)[1];
        });

    }

    statProcess (xublitProcessId) {

        var procFile;
        var filename = procIdToFilename(xublitProcessId);

        if (!this.processDirectory.containsFile(filename)) {
            return undefined;
        }

        procFile = this.processDirectory.file(filename);

        try {
            let stats = JSON.parse(procFile.contents);
            stats.uptime = timeSince(stats.startedAt);
            return stats;
        }
        catch (e) {
            console.log(e.stack);
        }

    }

    initNewNodeProcess (pwd, absPath) {

        if (!path.isAbsolute(absPath)) {
            throw new Error(`First argument must be an absolute path`);
        }

        var appRootPath = pwd.absPath;
        var processDirectory = this.processDirectory;

        var xublitProcessId = new IoId();
        
        var stdio = createProcessFilesFor(xublitProcessId)
            .in(this.processDirectory);

        var args = [];
        var opts = {
            detached: true,
            stdio: [
                stdio.in,
                stdio.out,
                stdio.err,
            ],
            env: {
                pwd: appRootPath,
            },
        };

        var childProcess = fork(absPath, args, opts);
        var pid = getPidFor(childProcess);

        childProcess.unref();

        var now = Date.now();
        var procInfo = {
            pid: pid,
            xublitPid: xublitProcessId.value,
            appRoot: appRootPath,
            startedAt: now,
            stoppedAt: null,
        };

        var procInfoFile = processDirectory.mkfile(
            procIdToFilename(xublitProcessId)
        );

        procInfoFile.contents = JSON.stringify(procInfo, undefined, '  ');

        return new ProcessControlInterface(procInfoFile);

    }

}

function createProcessFilesFor (xublitProcessId) {

    var stdInFilename = `${xublitProcessId}.in`;
    var stdOutFilename = `${xublitProcessId}.out`;
    var stdErrFilename = `${xublitProcessId}.err`;

    return {
        in: function (directory) {
            return {
                in: fs.openSync(directory.mkfile(stdInFilename).absPath, 'a'),
                out: fs.openSync(directory.mkfile(stdOutFilename).absPath, 'a'),
                err: fs.openSync(directory.mkfile(stdErrFilename).absPath, 'a'),
            };
        },
    };

}

function getPidFor (childProcess) {
    return childProcess.pid;
}

function kill (pid, signal) {

}

function procIdToFilename (xublitProcessId) {
    return `proc-${xublitProcessId}.json`;
}

function initProps (processManager, xublitCli) {

    var dataDirectory = xublitCli.dataDirectory;
    var processDirectory = dataDirectory.procSubdir;

    Object.defineProperties(processManager, {

        xublitCli: {
            value: xublitCli,
        },

        running: {
            get: function () {
                
                var xublitProcessIds = processManager.listXublitProcessIds();

                var processes = xublitProcessIds.map((xublitProcessId) => {
                    return processManager.statProcess(xublitProcessId);
                });

                return processes.filter((proc) => {

                    if (undefined === proc) {
                        return false;
                    }

                    if (null !== proc.stoppedAt) {
                        return false;
                    }

                    return true;

                });

            },
        },

        processDirectory: {
            value: processDirectory,
        },

    });

}

function listOfProcessesIn (processDirectory) {
    return processDirectory.files.filter(function (processFileName) {
        return /[0-9a-z]+]\.json/.test(processFileName);
    });
}

function timeSince (ms) {
    return new TimeDifferential(Date.now(), ms);
}
