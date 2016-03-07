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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var measurements = [{
    id: 'DAYS',
    inMs: 86400000
}, {
    id: 'HOURS',
    inMs: 3600000
}, {
    id: 'MINUTES',
    inMs: 60000
}, {
    id: 'SECONDS',
    inMs: 1000
}, {
    id: 'MILLISECONDS',
    inMs: 1
}];

var Duration = function () {
    function Duration(milliseconds) {
        _classCallCheck(this, Duration);

        initProps(this, milliseconds);
    }

    _createClass(Duration, null, [{
        key: 'measurement',
        value: function measurement(id) {
            return;
        }
    }]);

    return Duration;
}();

exports.default = Duration;


function initProps(duration, milliseconds) {

    measurements.forEach(function (measurement) {

        var measurementId = measurement.id;
        var measurementMs = measurement.inMs;

        if (milliseconds < measurementMs) {
            defineMeasurement(measurementId, 0);
            return;
        }

        defineMeasurement(measurementId, Math.floor(milliseconds / measurementMs));

        milliseconds = milliseconds % measurementMs;
    });

    function defineMeasurement(measurementId, value) {
        Object.defineProperty(duration, measurementId, {
            value: value
        });
    }
}
//# sourceMappingURL=duration.js.map
