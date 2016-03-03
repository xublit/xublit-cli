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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IoId = function () {
    function IoId(ioIdStr) {
        _classCallCheck(this, IoId);

        initAttrs(this, ioIdStr);
    }

    _createClass(IoId, null, [{
        key: 'uniqueIoId',
        value: function uniqueIoId(applicationRoot) {
            return new IoId(_uniqueIoId(applicationRoot));
        }
    }]);

    return IoId;
}();

exports.default = IoId;


function initAttrs(ioId, ioIdStr) {

    Object.defineProperties(ioId, {

        value: {
            value: ioIdStr
        },

        stdinFilename: {
            value: stdinFilenameForIoId(ioId)
        },

        stdoutFilename: {
            value: stdoutFilenameForIoId(ioId)
        },

        stderrFilename: {
            value: stderrFilenameForIoId(ioId)
        }

    });
}

function createRandomIoId() {
    return randomHexToBase64().replace(/[\+\/=]/g, '');
}

function randomHexToBase64() {

    var randomHex = Math.random().toString().replace('.', '');

    if (1 === randomHex.length % 2) {
        randomHex = randomHex + '0';
    }

    randomHex = new Buffer(randomHex, 'hex');

    return randomHex.toString('base64');
}

function stdinFilenameForIoId(ioIdStr) {
    return '.' + ioIdStr + '.in.tmp';
}

function stdoutFilenameForIoId(ioIdStr) {
    return '.' + ioIdStr + '.out.tmp';
}

function stderrFilenameForIoId(ioIdStr) {
    return '.' + ioIdStr + '.err.tmp';
}

function _uniqueIoId(targetDirectory) {

    var IO_ID_NOT_AVAILABLE = 'IO_ID_NOT_AVAILABLE';
    var ITERATION_LIMIT_REACHED = 'ITERATION_LIMIT_REACHED';

    var availableIoId;
    var i = iterationCount(arguments);
    var newIoId = createRandomIoId();

    if (iterationLimitExceeded()) {
        throw ITERATION_LIMIT_EXCEEDED;
    }

    try {
        assertAvailable();
        availableIoId = newIoId;
    } catch (error) {

        if (error instanceof Error) {
            throw Error;
        }

        switch (error) {
            case IO_ID_NOT_AVAILABLE:
                availableIoId = newIoId(targetDirectory, i);
                break;
            case ITERATION_LIMIT_EXCEEDED:
                throw new Error('Iteration limit exceeded before available I/O ID was found');
                break;
        }
    }

    return availableIoId;

    function assertAvailable() {
        if (inFileExistsForIoId()) {
            throw IO_ID_NOT_AVAILABLE;
        }
    }

    function inFileExistsForIoId() {
        return targetDirectory.containsFile(stdinFilenameForIoId(newIoId));
    }

    function iterationLimitExceeded() {
        return i[0] > i[1];
    }

    function iterationCount(args) {

        var numArgs = args.length;
        var lastArg = args[numArgs - 1];

        if (1 === numArgs) {
            return { current: 1, max: 10 };
        }

        return args[1];
    }
}
//# sourceMappingURL=proc-io-id.js.map
