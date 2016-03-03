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
exports.AppInitialiser = undefined;

var _appInitialiser = require('./cli-tools/app-initialiser');

var appInitialiser = _interopRequireWildcard(_appInitialiser);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var AppInitialiser = exports.AppInitialiser = appInitialiser.AppInitialiser;
//# sourceMappingURL=cli-tools.js.map
