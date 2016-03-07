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

var _util = require('util');

var util = _interopRequireWildcard(_util);

var _interaction = require('./interaction');

var _interaction2 = _interopRequireDefault(_interaction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Prompt = function (_Interaction) {
    _inherits(Prompt, _Interaction);

    function Prompt(id, opts) {
        _classCallCheck(this, Prompt);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Prompt).call(this, id));

        opts = opts || {};

        var defaultValue = 'defaultValue' in opts ? opts.defaultValue : '';
        var phrase = opts.phrase || Prompt.createPhrase(id, defaultValue);

        Object.defineProperties(_this, {

            phrase: {
                value: phrase
            },

            defaultValue: {
                value: defaultValue
            }

        });

        return _this;
    }

    _createClass(Prompt, [{
        key: 'getResponse',
        value: function getResponse(commander) {
            var _this2 = this;

            return new Promise(function (resolve) {
                commander.prompt(_this2.phrase, function (result) {
                    result = '' !== result ? result : _this2.defaultValue;
                    resolve(result);
                });
            });
        }
    }], [{
        key: 'createPhrase',
        value: function createPhrase(id, defaultValue) {

            var phrase = util.format('%s: ', id);

            if ('' === defaultValue) {
                return phrase;
            }

            return phrase.concat(util.format('(%s) ', defaultValue));
        }
    }]);

    return Prompt;
}(_interaction2.default);

exports.default = Prompt;
//# sourceMappingURL=prompt.js.map
