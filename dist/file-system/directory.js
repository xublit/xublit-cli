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

var _file = require('./file');

var _file2 = _interopRequireDefault(_file);

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _shelljs = require('shelljs');

var sh = _interopRequireWildcard(_shelljs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Directory = function () {
    function Directory(absPath) {
        _classCallCheck(this, Directory);

        absPath = path.resolve(absPath);

        initDirIfNotExists(absPath);

        initProps(this, absPath);

        this.parseContents();
    }

    _createClass(Directory, [{
        key: 'absolutePath',
        value: function absolutePath() {
            return path.join.apply(path, [this.absPath].concat(Array.prototype.slice.call(arguments)));
        }
    }, {
        key: 'assertDoesNotContain',
        value: function assertDoesNotContain(handle) {

            if (!this.contains(handle)) {
                return;
            }

            throw new Error(util.format('"%s" already exists', handle));
        }
    }, {
        key: 'parseContents',
        value: function parseContents() {
            var _this = this;

            var dirContents = ls(this.absPath);

            dirContents.forEach(function (item) {

                var itemBasename = path.basename(item.name);

                if (item.isFile()) {
                    return _this.files.push(itemBasename);
                }

                if (item.isDirectory()) {
                    return _this.subdirs.push(itemBasename);
                }
            });
        }
    }, {
        key: 'clearParsedContents',
        value: function clearParsedContents() {
            this.files.splice(0, this.files.length);
            this.subdirs.splice(0, this.subdirs.length);
            return this;
        }
    }, {
        key: 'contains',
        value: function contains(handle) {
            return this.containsFile(handle) || this.containsDir(handle);
        }
    }, {
        key: 'containsDir',
        value: function containsDir(handle) {
            return this.subdirs.indexOf(handle) > -1;
        }
    }, {
        key: 'containsFile',
        value: function containsFile(handle) {
            return this.files.indexOf(handle) > -1;
        }
    }, {
        key: 'file',
        value: function file(handle) {

            if (!this.containsFile(handle)) {
                return undefined;
            }

            if (handle in this.cachedFiles) {
                return this.cachedFiles[handle];
            }

            return this.cachedFiles[handle] = new _file2.default(this.prefixPath(handle));
        }
    }, {
        key: 'mkfile',
        value: function mkfile(handle) {

            this.assertDoesNotContain(handle);

            sh.touch(this.prefixPath(handle));

            this.files.push(handle);

            return this.file(handle);
        }
    }, {
        key: 'mksubdir',
        value: function mksubdir(handle) {

            this.assertDoesNotContain(handle);

            sh.mkdir(this.prefixPath(handle));

            this.subdirs.push(handle);

            return this.subdir(handle);
        }
    }, {
        key: 'prefixPath',
        value: function prefixPath(handle) {
            return path.join(this.absPath, handle);
        }
    }, {
        key: 'recursiveLs',
        value: function recursiveLs(subdir) {
            return sh.ls('-R', this.absolutePath(subdir)).map(function (relativePath) {
                return path.join(subdir, relativePath);
            });
        }
    }, {
        key: 'refresh',
        value: function refresh() {

            this.clearParsedContents().parseContents();

            return this;
        }
    }, {
        key: 'subdir',
        value: function subdir(handle) {

            if (!this.containsDir(handle)) {
                return undefined;
            }

            if (handle in this.cachedSubdirs) {
                return this.cachedSubdirs[handle];
            }

            return this.cachedSubdirs[handle] = new Directory(this.prefixPath(handle));
        }
    }, {
        key: 'toString',
        value: function toString() {
            return this.absPath;
        }
    }]);

    return Directory;
}();

exports.default = Directory;


function initDirIfNotExists(absPath) {

    if (sh.test('-d', absPath)) {
        return;
    }

    try {
        sh.mkdir(absPath);
    } catch (err) {
        throw new Error(util.format('Failed to initialise directory %s: %s', absPath, err.message));
    }
}

function initProps(directory, absPath) {

    var cachedFiles = {};
    var cachedSubdirs = {};

    var basename = path.basename(absPath);

    var files = [];
    var subdirs = [];

    Object.defineProperties(directory, {

        basename: {
            value: basename,
            enumerable: true
        },

        absPath: {
            value: absPath,
            enumerable: true
        },

        cachedFiles: {
            value: cachedFiles
        },

        cachedSubdirs: {
            value: cachedSubdirs
        },

        files: {
            value: files,
            enumerable: true
        },

        subdirs: {
            value: subdirs,
            enumerable: true
        }

    });
}

function ls(dirname) {
    return sh.ls('-Al', dirname);
}
//# sourceMappingURL=directory.js.map
