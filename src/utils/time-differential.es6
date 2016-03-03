import Duration from './duration';

export default class TimeDifferential extends Duration {

    constructor (timeA, timeB) {

        super(Math.abs(timeA - timeB));

        initProps(this, timeA, timeB);

    }

}

function initProps (timeDifferential, timeA, timeB) {

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
            get: function () {
                return [timeA, timeB];
            },
        },

        msDifference: {
            value: msDifference,
        },

        futureTime: {
            value: futureTime,
        },

    });

}
