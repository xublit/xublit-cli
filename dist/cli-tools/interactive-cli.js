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

var _interactionQueue = require('./interactive-cli/interaction-queue');

var _interactionQueue2 = _interopRequireDefault(_interactionQueue);

var _prompt = require('./interactive-cli/prompt');

var _prompt2 = _interopRequireDefault(_prompt);

var _confirm = require('./interactive-cli/confirm');

var _confirm2 = _interopRequireDefault(_confirm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InteractiveCli = function () {
    function InteractiveCli(commander) {
        _classCallCheck(this, InteractiveCli);

        initProps(this, commander);
    }

    _createClass(InteractiveCli, [{
        key: 'queueInteractions',
        value: function queueInteractions(interactions) {
            var _this = this;

            if (!Array.isArray(interactions)) {
                interactions = [interactions];
            }

            interactions.forEach(function (interaction) {
                _this.interactions.add(interaction);
            });

            return this;
        }
    }, {
        key: 'provideInterface',
        value: function provideInterface(opts) {

            opts = opts || {};
            var onComplete = opts.onComplete || function () {};

            return this.interactions.performAll().then(function (results) {
                onComplete(undefined, results);
                return results;
            });
        }
    }], [{
        key: 'Prompt',
        value: function Prompt() {
            return _prompt2.default;
        }
    }, {
        key: 'Confirm',
        value: function Confirm() {
            return _confirm2.default;
        }
    }]);

    return InteractiveCli;
}();

exports.default = InteractiveCli;


function initProps(interactiveCli, commander) {

    var interactions = new _interactionQueue2.default(commander);

    Object.defineProperty(interactiveCli, 'interactions', {
        value: interactions
    });
}
//# sourceMappingURL=interactive-cli.js.map
