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

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var File = function () {
    function File(absPath) {
        _classCallCheck(this, File);

        initProps(this, path.resolve(absPath));
    }

    _createClass(File, [{
        key: 'append',
        value: function append(str) {
            sh.echo(str).toEnd(this.absPath);
            return this;
        }
    }, {
        key: 'parseContents',
        value: function parseContents(parser) {
            return parser(this.contents);
        }
    }]);

    return File;
}();

exports.default = File;


function initProps(file, absPath) {

    var fd = fs.openSync(absPath, 'r+');

    Object.defineProperties(file, {

        absPath: {
            value: absPath
        },

        contents: {
            get: function get() {
                return fs.readFileSync(fd, { encoding: 'utf8' });
            },
            set: function set(newValue) {
                fs.writeFileSync(fd, newValue, { encoding: 'utf8' });
                return newValue;
            }
        },

        filename: {
            value: path.parse(absPath).base
        }

    });
}
//# sourceMappingURL=file.js.map
