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

var IoId = function () {
    function IoId() {
        _classCallCheck(this, IoId);

        initAttrs(this);
    }

    _createClass(IoId, [{
        key: 'toString',
        value: function toString() {
            return this.value;
        }
    }]);

    return IoId;
}();

exports.default = IoId;


function initAttrs(ioId, ioIdStr) {

    Object.defineProperties(ioId, {

        value: {
            value: createRandomIoId()
        }

    });
}

function createRandomIoId() {
    return randomHexToBase64().replace(/[\+\/=]/g, '');
}

function randomHexToBase64() {

    var randomHex = Math.random().toString().replace('.', '');

    if (1 === randomHex.length % 2) {
        randomHex = randomHex + '0';
    }

    randomHex = new Buffer(randomHex, 'hex');

    return randomHex.toString('base64');
}
//# sourceMappingURL=proc-io-id.js.map
