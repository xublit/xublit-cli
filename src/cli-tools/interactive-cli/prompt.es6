import * as util from 'util';

import Interaction from './interaction';

export default class Prompt extends Interaction {

    constructor (id, opts) {

        super(id);

        opts = opts || {};

        var defaultValue = 'defaultValue' in opts ? opts.defaultValue : '';
        var phrase = opts.phrase || Prompt.createPhrase(id, defaultValue);

        Object.defineProperties(this, {

            phrase: {
                value: phrase,
            },

            defaultValue: {
                value: defaultValue,
            },

        });

    }

    static createPhrase (id, defaultValue) {

        var phrase = util.format('%s: ', id);

        if ('' === defaultValue) {
            return phrase;
        }

        return phrase.concat(util.format('(%s) ', defaultValue));

    }

    getResponse (commander) {
        return new Promise((resolve) => {
            commander.prompt(this.phrase, (result) => {
                result = '' !== result ? result : this.defaultValue;
                resolve(result);
            });
        });
    }

}
