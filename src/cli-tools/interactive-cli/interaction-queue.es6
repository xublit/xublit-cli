import Interaction from './interaction';

export default class InteractionQueue {

    constructor (commander) {

        initProps(this, commander);

    }

    add (interaction) {

        if (!(interaction instanceof Interaction)) {
            throw new TypeError(
                'Invalid interaction - must be an instance of Interaction'
            );
        }

        this.interactions.push(interaction);

        return this;

    }

    performAll () {

        var commander = this.commander;
        var interactions = this.interactions;
        var nextInteractionIndex = 0;

        var results = {};

        return new Promise((resolve, reject) => {

            function performNextInteraction () {

                if (nextInteractionIndex >= interactions.length) {
                    return resolve(results);
                }

                let interaction = interactions[nextInteractionIndex];

                return interaction
                    .getResponse(commander)
                    .then(function (result) {
                        results[interaction.id] = result;
                        nextInteractionIndex++;
                        performNextInteraction();
                    });

            }

            performNextInteraction()
                .catch(function (rejection) {
                    reject(rejection);
                });

        });

    }

}

function initProps (interactionQueue, commander) {

    var interactions = [];

    Object.defineProperty(interactionQueue, 'interactions', {
        value: interactions,
    });

    Object.defineProperty(interactionQueue, 'commander', {
        value: commander,
    });
    
}
