import InteractionQueue from './interactive-cli/interaction-queue';
import Prompt from './interactive-cli/prompt';
import Confirm from './interactive-cli/confirm';

export default class InteractiveCli {

    constructor (commander) {

        initProps(this, commander);

    }

    static Prompt () {
        return Prompt;
    }

    static Confirm () {
        return Confirm;
    }

    queueInteractions (interactions) {

        if (!Array.isArray(interactions)) {
            interactions = [interactions];
        }

        interactions.forEach((interaction) => {
            this.interactions.add(interaction);
        });

        return this;

    }

    provideInterface (opts) {

        opts = opts || {};
        var onComplete = opts.onComplete || function () { };

        return this
            .interactions
            .performAll()
            .then((results) => {
                onComplete(undefined, results);
                return results;
            });

    }

}

function initProps (interactiveCli, commander) {

    var interactions = new InteractionQueue(commander);

    Object.defineProperty(interactiveCli, 'interactions', {
        value: interactions,
    });

}
