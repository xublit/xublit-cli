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

require('babel-polyfill');

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _shelljs = require('shelljs');

var shell = _interopRequireWildcard(_shelljs);

var _constants = require('../constants');

var __ = _interopRequireWildcard(_constants);

var _npmPkgRoot = require('./npm-pkg-root');

var _npmPkgRoot2 = _interopRequireDefault(_npmPkgRoot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ApplicationRoot = function (_NpmPackageRoot) {
    _inherits(ApplicationRoot, _NpmPackageRoot);

    function ApplicationRoot(absolutePath) {
        _classCallCheck(this, ApplicationRoot);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ApplicationRoot).call(this, absolutePath));

        initProps(_this);

        return _this;
    }

    return ApplicationRoot;
}(_npmPkgRoot2.default);

exports.default = ApplicationRoot;


function initProps(applicationRoot) {

    if (!applicationRoot.containsFile(__.XUBLIT_CONFIG_FILENAME)) {
        throw new Error(__.INVALID_XUBLIT_APPLICATION_ROOT);
    }

    var xublitConfigFile = applicationRoot.file(__.XUBLIT_CONFIG_FILENAME);

    Object.defineProperties(applicationRoot, {

        xublitConfigFile: {
            get: function get() {
                return xublitConfigFile;
            }
        }

    });
}
//# sourceMappingURL=app-root.js.map
