import * as util from 'util';

import Interaction from './interaction';

export default class Confirm extends Interaction {

    constructor (id, opts) {
        
        super(id);

        opts = opts || {};

        var hasValidDefaultValueOpt = 'defaultValue' in opts && 
            'boolean' === typeof opts.defaultValue;

        var defaultValue = hasValidDefaultValueOpt ? opts.defaultValue : true;
        var phrase = opts.phrase;

        phrase = phrase.concat(' ', Confirm.defaultValueIndicator(defaultValue));

        Object.defineProperties(this, {

            phrase: {
                value: phrase,
            },

            defaultValue: {
                value: defaultValue,
            },

        });

    }

    static createPhrase (key, defaultValue) {

        var phrase = util.format('%s ', key);

        return phrase;

    }

    static defaultValueIndicator (defaultValue) {
        return true === defaultValue ? '[Y/n]' : '[y/N]';
    }

    getResponse (commander) {
        return new Promise((resolve) => {
            commander.prompt(this.phrase, (result) => {

                switch (result.trim().toLowerCase()) {
                    case 'y':
                        resolve(true);
                        break;
                    case 'n':
                        resolve(false);
                        break;
                    default:
                        resolve(this.defaultValue);
                        break;
                }

            });
        });
    }

}
