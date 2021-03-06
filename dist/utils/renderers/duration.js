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

var _renderer = require('../renderer');

var _renderer2 = _interopRequireDefault(_renderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var labels = {
    DAYS: {
        one: 'day',
        many: 'days'
    },
    HOURS: {
        one: 'hour',
        many: 'hours'
    },
    MINUTES: {
        one: 'minute',
        many: 'minutes'
    },
    SECONDS: {
        one: 'second',
        many: 'seconds'
    }
};

var measurements = ['DAYS', 'HOURS', 'MINUTES', 'SECONDS'];

var DurationRenderer = function (_Renderer) {
    _inherits(DurationRenderer, _Renderer);

    function DurationRenderer() {
        _classCallCheck(this, DurationRenderer);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(DurationRenderer).call(this));
    }

    _createClass(DurationRenderer, [{
        key: 'render',
        value: function render(duration) {

            var strParts = [];

            measurements.forEach(function (measurement) {

                var val = duration[measurement];
                if (val < 1) {
                    return;
                }

                strParts.push(format(measurement, val));
            });

            return strParts.join(' ');
        }
    }]);

    return DurationRenderer;
}(_renderer2.default);

exports.default = DurationRenderer;


function format(measurement, value) {

    var label = value === 1 ? labels[measurement].one : labels[measurement].many;

    return [value, label].join(' ');
}
//# sourceMappingURL=duration.js.map
