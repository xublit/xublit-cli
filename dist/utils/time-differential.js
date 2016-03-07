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

var _duration = require('./duration');

var _duration2 = _interopRequireDefault(_duration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimeDifferential = function (_Duration) {
    _inherits(TimeDifferential, _Duration);

    function TimeDifferential(timeA, timeB) {
        _classCallCheck(this, TimeDifferential);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TimeDifferential).call(this, Math.abs(timeA - timeB)));

        initProps(_this, timeA, timeB);

        return _this;
    }

    return TimeDifferential;
}(_duration2.default);

exports.default = TimeDifferential;


function initProps(timeDifferential, timeA, timeB) {

    var msDifference = timeA - timeB;
    var timeAGtTimeB = timeA > timeB;

    var futureTime = timeB;
    var pastTime = timeA;

    if (timeAGtTimeB) {
        futureTime = timeA;
        pastTime = timeB;
    }

    Object.defineProperties(timeDifferential, {

        input: {
            get: function get() {
                return [timeA, timeB];
            }
        },

        msDifference: {
            value: msDifference
        },

        futureTime: {
            value: futureTime
        }

    });
}
//# sourceMappingURL=time-differential.js.map
