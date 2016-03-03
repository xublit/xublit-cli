const measurements = [{
    id: 'DAYS',
    inMs: 86400000,
}, {
    id: 'HOURS',
    inMs: 3600000,
}, {
    id: 'MINUTES',
    inMs: 60000,
}, {
    id: 'SECONDS',
    inMs: 1000,
}, {
    id: 'MILLISECONDS',
    inMs: 1,
}];

export default class Duration {

    constructor (milliseconds) {

        initProps(this, milliseconds);

    }

    static measurement (id) {
        return 
    }

}

function initProps (duration, milliseconds) {

    measurements.forEach((measurement) => {

        let measurementId = measurement.id;
        let measurementMs = measurement.inMs;

        if (milliseconds < measurementMs) {
            defineMeasurement(measurementId, 0);
            return;
        }

        defineMeasurement(measurementId, Math.floor(
            milliseconds / measurementMs
        ));

        milliseconds = milliseconds % measurementMs;

    });

    function defineMeasurement (measurementId, value) {
        Object.defineProperty(duration, measurementId, {
            value: value,
        });
    }

}
