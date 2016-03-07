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

var _interaction = require('./interaction');

var _interaction2 = _interopRequireDefault(_interaction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InteractionQueue = function () {
    function InteractionQueue(commander) {
        _classCallCheck(this, InteractionQueue);

        initProps(this, commander);
    }

    _createClass(InteractionQueue, [{
        key: 'add',
        value: function add(interaction) {

            if (!(interaction instanceof _interaction2.default)) {
                throw new TypeError('Invalid interaction - must be an instance of Interaction');
            }

            this.interactions.push(interaction);

            return this;
        }
    }, {
        key: 'performAll',
        value: function performAll() {

            var commander = this.commander;
            var interactions = this.interactions;
            var nextInteractionIndex = 0;

            var results = {};

            return new Promise(function (resolve, reject) {

                function performNextInteraction() {

                    if (nextInteractionIndex >= interactions.length) {
                        return resolve(results);
                    }

                    var interaction = interactions[nextInteractionIndex];

                    return interaction.getResponse(commander).then(function (result) {
                        results[interaction.id] = result;
                        nextInteractionIndex++;
                        performNextInteraction();
                    });
                }

                performNextInteraction().catch(function (rejection) {
                    reject(rejection);
                });
            });
        }
    }]);

    return InteractionQueue;
}();

exports.default = InteractionQueue;


function initProps(interactionQueue, commander) {

    var interactions = [];

    Object.defineProperty(interactionQueue, 'interactions', {
        value: interactions
    });

    Object.defineProperty(interactionQueue, 'commander', {
        value: commander
    });
}
//# sourceMappingURL=interaction-queue.js.map
