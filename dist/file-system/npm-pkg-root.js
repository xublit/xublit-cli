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

require('babel-polyfill');

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _util = require('util');

var util = _interopRequireWildcard(_util);

var _shelljs = require('shelljs');

var shell = _interopRequireWildcard(_shelljs);

var _constants = require('../constants');

var __ = _interopRequireWildcard(_constants);

var _directory = require('./directory');

var _directory2 = _interopRequireDefault(_directory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NpmPackageRoot = function (_Directory) {
    _inherits(NpmPackageRoot, _Directory);

    function NpmPackageRoot(absolutePath) {
        _classCallCheck(this, NpmPackageRoot);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NpmPackageRoot).call(this, absolutePath));

        initProps(_this);

        return _this;
    }

    _createClass(NpmPackageRoot, [{
        key: 'validateNpmPackageConfig',
        value: function validateNpmPackageConfig() {

            if (!this.containsNpmPackageConfigFile) {
                throw new Error(util.format('No %s found in %s', __.NPM_PACKAGE_CONFIG_FILENAME, this.absPath));
            }
        }
    }]);

    return NpmPackageRoot;
}(_directory2.default);

exports.default = NpmPackageRoot;


function initProps(npmPackageRoot) {

    if (!npmPackageRoot.containsFile(__.NPM_PACKAGE_CONFIG_FILENAME)) {
        throw new Error(__.INVALID_NPM_PACKAGE_ROOT);
    }

    var npmConfigFile = npmPackageRoot.file(__.NPM_PACKAGE_CONFIG_FILENAME);

    Object.defineProperties(npmPackageRoot, {

        npmConfigFile: {
            get: function get() {
                return npmConfigFile;
            }
        }

    });
}
//# sourceMappingURL=npm-pkg-root.js.map
