/**
 * Xublit command line interface
 * @version v0.1.0-dev-2016-03-08
 * @link 
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';

var _xublitInjector = require('xublit-injector');

var _xublitInjector2 = _interopRequireDefault(_xublitInjector);

var _path = require('path');

var path = _interopRequireWildcard(_path);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var injector = new _xublitInjector2.default({
    baseDir: process.env.pwd,
    includeDirs: [path.join(process.env.pwd, 'src')]
});

injector.bootstrap();
//# sourceMappingURL=app-instance.js.map
