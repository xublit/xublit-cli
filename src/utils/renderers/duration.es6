import Renderer from '../renderer';

const labels = {
    DAYS: {
        one: 'day',
        many: 'days',
    },
    HOURS: {
        one: 'hour',
        many: 'hours',
    },
    MINUTES: {
        one: 'minute',
        many: 'minutes',
    },
    SECONDS: {
        one: 'second',
        many: 'seconds',
    },
};

const measurements = [
    'DAYS',
    'HOURS',
    'MINUTES',
    'SECONDS',
];

export default class DurationRenderer extends Renderer {

    constructor () {
        
        super();

    }

    render (duration) {

        var strParts = [];


        measurements.forEach((measurement) => {
            
            let val = duration[measurement];
            if (val < 1) {
                return;
            }

            strParts.push(format(measurement, val));

        });

        return strParts.join(' ');

    }

}

function format (measurement, value) {

    let label = value === 1 ?
        labels[measurement].one :
        labels[measurement].many;
    
    return [value, label].join(' ');

}
